import pool from "../config/db.js";

const ensureSequence = async (tableName) => {
    const sequenceName = `${tableName}_id_seq`;

    await pool.query(`CREATE SEQUENCE IF NOT EXISTS public.${sequenceName};`);

    await pool.query(`
        DO $$
        DECLARE
            id_is_identity boolean;
        BEGIN
            IF EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_schema = 'public'
                  AND table_name = '${tableName}'
            ) THEN
                SELECT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_schema = 'public'
                      AND table_name = '${tableName}'
                      AND column_name = 'id'
                      AND is_identity = 'YES'
                ) INTO id_is_identity;

                IF id_is_identity THEN
                    IF (SELECT COUNT(*) FROM public.${tableName}) = 0 THEN
                        PERFORM setval('public.${sequenceName}', 1, false);
                    ELSE
                        PERFORM setval(
                            'public.${sequenceName}',
                            (SELECT MAX(id) FROM public.${tableName}),
                            true
                        );
                    END IF;
                ELSE
                    ALTER TABLE public.${tableName}
                        ALTER COLUMN id SET DEFAULT nextval('public.${sequenceName}'::regclass);

                    IF (SELECT COUNT(*) FROM public.${tableName}) = 0 THEN
                        PERFORM setval('public.${sequenceName}', 1, false);
                    ELSE
                        PERFORM setval(
                            'public.${sequenceName}',
                            (SELECT MAX(id) FROM public.${tableName}),
                            true
                        );
                    END IF;
                END IF;
            END IF;
        END $$;
    `);
};

const seedUsersDb = async ()=> {
    await ensureSequence("users");

    await pool.query(
        `CREATE TABLE IF NOT EXISTS public.users
    (
        id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
        name character varying(100) COLLATE pg_catalog."default" NOT NULL,
        email character varying(255) COLLATE pg_catalog."default" NOT NULL,
        password_hash text COLLATE pg_catalog."default" NOT NULL,
        role character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'USER'::character varying,
        created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT users_pkey PRIMARY KEY (id),
        CONSTRAINT users_email_key UNIQUE (email),
        CONSTRAINT users_role_check CHECK (role::text = ANY (ARRAY['USER'::character varying, 'DESIGNER'::character varying, 'ADMIN'::character varying]::text[]))
    )`,
    );
    
    // Add designer profile fields to existing databases.
    await pool.query(`
        ALTER TABLE public.users
        ADD COLUMN IF NOT EXISTS brand_name VARCHAR(150),
        ADD COLUMN IF NOT EXISTS phone_number VARCHAR(30),
        ADD COLUMN IF NOT EXISTS city VARCHAR(100),
        ADD COLUMN IF NOT EXISTS state VARCHAR(100);
    `);
}


const seedGarmentsDb = async ()=> {
    await ensureSequence("garments");

    await pool.query(
        `CREATE TABLE IF NOT EXISTS public.garments
    (
        id integer NOT NULL DEFAULT nextval('garments_id_seq'::regclass),
        -- designer_id integer,
        fabric_id integer,
        name character varying(150) COLLATE pg_catalog."default" NOT NULL,
        description text COLLATE pg_catalog."default",
        image_url text COLLATE pg_catalog."default",
        status character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'DRAFT'::character varying,
        created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT garments_pkey PRIMARY KEY (id),
        -- CONSTRAINT garments_designer_id_fkey FOREIGN KEY (designer_id)
        --    REFERENCES public.users (id) MATCH SIMPLE
        --    ON UPDATE NO ACTION
        --    ON DELETE NO ACTION,
        CONSTRAINT garments_fabric_id_fkey FOREIGN KEY (fabric_id)
            REFERENCES public.fabrics (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION,
        CONSTRAINT garments_status_check CHECK (status::text = ANY (ARRAY['DRAFT'::character varying, 'PENDING'::character varying, 'APPROVED'::character varying, 'REJECTED'::character varying]::text[]))
    )`,
    );
}

const seedCareInstDb = async ()=> {
    await ensureSequence("care_instructions");
    await pool.query(
        `
            CREATE TABLE IF NOT EXISTS public.care_instructions
    (
        id integer NOT NULL DEFAULT nextval('care_instructions_id_seq'::regclass),
        garment_id integer NOT NULL,
        category character varying(50) COLLATE pg_catalog."default" NOT NULL,
        instruction text COLLATE pg_catalog."default" NOT NULL,
        temperature character varying(50) COLLATE pg_catalog."default",
        method character varying(100) COLLATE pg_catalog."default",
        warnings text COLLATE pg_catalog."default",
        created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT care_instructions_pkey PRIMARY KEY (id),
        CONSTRAINT care_instructions_garment_id_fkey FOREIGN KEY (garment_id)
            REFERENCES public.garments (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    )`,
    ); 
}

const seedFabricWisdomDb = async ()=> {
    await ensureSequence("fabric_wisdom");
    await pool.query(
        `CREATE TABLE IF NOT EXISTS public.fabric_wisdom
    (
        id integer NOT NULL DEFAULT nextval('fabric_wisdom_id_seq'::regclass),
        title character varying(200) COLLATE pg_catalog."default" NOT NULL,
        content text COLLATE pg_catalog."default" NOT NULL,
        fabric_id integer,
        author_id integer,
        status character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'DRAFT'::character varying,
        created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fabric_wisdom_pkey PRIMARY KEY (id),
        -- CONSTRAINT fabric_wisdom_author_id_fkey FOREIGN KEY (author_id)
        --    REFERENCES public.users (id) MATCH SIMPLE
        --    ON UPDATE NO ACTION
        --    ON DELETE SET NULL,
        CONSTRAINT fabric_wisdom_fabric_id_fkey FOREIGN KEY (fabric_id)
            REFERENCES public.fabrics (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE SET NULL,
        CONSTRAINT fabric_wisdom_status_check CHECK (status::text = ANY (ARRAY['DRAFT'::character varying, 'PUBLISHED'::character varying, 'ARCHIVED'::character varying]::text[]))
    )
    `,
    );

}

const seedFabricDb = async ()=> {
    await ensureSequence("fabrics");

    await pool.query(
        `CREATE TABLE IF NOT EXISTS public.fabrics
    (
        id integer NOT NULL DEFAULT nextval('fabrics_id_seq'::regclass),
        name character varying(100) COLLATE pg_catalog."default" NOT NULL,
        description text COLLATE pg_catalog."default",
        origin character varying(150) COLLATE pg_catalog."default",
        characteristics text COLLATE pg_catalog."default",
        created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fabrics_pkey PRIMARY KEY (id),
        CONSTRAINT fabrics_name_key UNIQUE (name)
    )`,
    );
}


const seedQrDb = async ()=> {
    await ensureSequence("qr_codes");

    await pool.query(
        `CREATE TABLE IF NOT EXISTS public.qr_codes
    (
        id integer NOT NULL DEFAULT nextval('qr_codes_id_seq'::regclass),
        garment_id integer NOT NULL,
        code character varying(255) COLLATE pg_catalog."default" NOT NULL,
        is_active boolean DEFAULT true,
        created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT qr_codes_pkey PRIMARY KEY (id),
        CONSTRAINT qr_codes_code_key UNIQUE (code),
        CONSTRAINT qr_codes_garment_id_fkey FOREIGN KEY (garment_id)
            REFERENCES public.garments (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    )`,
    );
}

const seedScanHistoryDb = async ()=> {
    await ensureSequence("scan_history");

    await pool.query(
        `CREATE TABLE IF NOT EXISTS public.scan_history
    (
        id integer NOT NULL DEFAULT nextval('scan_history_id_seq'::regclass),
        user_id integer NOT NULL,
        qr_code_id integer NOT NULL,
        scanned_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT scan_history_pkey PRIMARY KEY (id),
        CONSTRAINT scan_history_qr_code_id_fkey FOREIGN KEY (qr_code_id)
            REFERENCES public.qr_codes (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT scan_history_user_id_fkey FOREIGN KEY (user_id)
            REFERENCES public.users (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    )`,
    );
}


const seedDesignerSubmissionsDb = async ()=> {
    await ensureSequence("designer_submissions");
    await pool.query(
        `CREATE TABLE IF NOT EXISTS public.designer_submissions
    (
        id integer NOT NULL DEFAULT nextval('designer_submissions_id_seq'::regclass),
        designer_id integer NOT NULL,
        garment_id integer NOT NULL,
        status character varying(20) COLLATE pg_catalog."default" NOT NULL DEFAULT 'PENDING'::character varying,
        submitted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
        reviewed_at timestamp without time zone,
        reviewed_by integer,
        review_notes text COLLATE pg_catalog."default",
        CONSTRAINT designer_submissions_pkey PRIMARY KEY (id),
        --CONSTRAINT designer_submissions_designer_id_fkey FOREIGN KEY (designer_id)
        --    REFERENCES public.users (id) MATCH SIMPLE
        --    ON UPDATE NO ACTION
        --    ON DELETE NO ACTION,
        CONSTRAINT designer_submissions_garment_id_fkey FOREIGN KEY (garment_id)
            REFERENCES public.garments (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION,
        --CONSTRAINT designer_submissions_reviewed_by_fkey FOREIGN KEY (reviewed_by)
        --    REFERENCES public.users (id) MATCH SIMPLE
        --    ON UPDATE NO ACTION
        --    ON DELETE NO ACTION,
        CONSTRAINT submissions_status_check CHECK (status::text = ANY (ARRAY['PENDING'::character varying, 'APPROVED'::character varying, 'REJECTED'::character varying]::text[]))
    )`,
    );

}

export const seedDatabase = async () => {
    try {
        await seedUsersDb();
        await seedFabricDb();
        await seedGarmentsDb();
        await seedCareInstDb();
        await seedFabricWisdomDb();
        await seedQrDb();
        await seedScanHistoryDb();
        await seedDesignerSubmissionsDb();
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error.message);
    }
};
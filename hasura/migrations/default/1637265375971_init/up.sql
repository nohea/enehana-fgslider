SET check_function_bodies = false;
CREATE TABLE public.ratingtick (
    id integer NOT NULL,
    focusgroup text,
    username text,
    rating integer,
    tick_ts timestamp with time zone DEFAULT now()
);
CREATE SEQUENCE public.ratingtick_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.ratingtick_id_seq OWNED BY public.ratingtick.id;
ALTER TABLE ONLY public.ratingtick ALTER COLUMN id SET DEFAULT nextval('public.ratingtick_id_seq'::regclass);
ALTER TABLE ONLY public.ratingtick
    ADD CONSTRAINT ratingtick_pkey PRIMARY KEY (id);

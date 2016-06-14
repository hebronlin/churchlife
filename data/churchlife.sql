--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO app_user;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO app_user;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE auth_group_id_seq OWNED BY auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO app_user;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO app_user;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE auth_group_permissions_id_seq OWNED BY auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO app_user;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO app_user;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE auth_permission_id_seq OWNED BY auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(30) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO app_user;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO app_user;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO app_user;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE auth_user_groups_id_seq OWNED BY auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO app_user;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE auth_user_id_seq OWNED BY auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO app_user;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO app_user;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE auth_user_user_permissions_id_seq OWNED BY auth_user_user_permissions.id;


--
-- Name: core_address; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE core_address (
    id integer NOT NULL,
    address1 character varying(255) NOT NULL,
    address2 character varying(255),
    city character varying(255) NOT NULL,
    state character varying(255) NOT NULL,
    zip_code character varying(50) NOT NULL,
    country character varying(2)
);


ALTER TABLE public.core_address OWNER TO app_user;

--
-- Name: core_address_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE core_address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_address_id_seq OWNER TO app_user;

--
-- Name: core_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE core_address_id_seq OWNED BY core_address.id;


--
-- Name: core_locality; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE core_locality (
    id integer NOT NULL,
    city character varying(255) NOT NULL,
    address_id integer
);


ALTER TABLE public.core_locality OWNER TO app_user;

--
-- Name: core_locality_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE core_locality_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.core_locality_id_seq OWNER TO app_user;

--
-- Name: core_locality_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE core_locality_id_seq OWNED BY core_locality.id;


--
-- Name: core_memberprofile; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE core_memberprofile (
    user_id integer NOT NULL,
    middle_name character varying(30),
    nick_name character varying(100),
    deleted boolean NOT NULL,
    timezone character varying(50) NOT NULL,
    locale character varying(50) NOT NULL,
    phone character varying(50),
    locality_id integer
);


ALTER TABLE public.core_memberprofile OWNER TO app_user;

--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO app_user;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO app_user;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE django_admin_log_id_seq OWNED BY django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO app_user;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO app_user;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE django_content_type_id_seq OWNED BY django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO app_user;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: app_user
--

CREATE SEQUENCE django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO app_user;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_user
--

ALTER SEQUENCE django_migrations_id_seq OWNED BY django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: app_user; Tablespace: 
--

CREATE TABLE django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO app_user;

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_group ALTER COLUMN id SET DEFAULT nextval('auth_group_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('auth_group_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_permission ALTER COLUMN id SET DEFAULT nextval('auth_permission_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_user ALTER COLUMN id SET DEFAULT nextval('auth_user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_user_groups ALTER COLUMN id SET DEFAULT nextval('auth_user_groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('auth_user_user_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY core_address ALTER COLUMN id SET DEFAULT nextval('core_address_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY core_locality ALTER COLUMN id SET DEFAULT nextval('core_locality_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY django_admin_log ALTER COLUMN id SET DEFAULT nextval('django_admin_log_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY django_content_type ALTER COLUMN id SET DEFAULT nextval('django_content_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY django_migrations ALTER COLUMN id SET DEFAULT nextval('django_migrations_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY auth_group (id, name) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('auth_group_id_seq', 1, false);


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('auth_group_permissions_id_seq', 1, false);


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can add permission	2	add_permission
5	Can change permission	2	change_permission
6	Can delete permission	2	delete_permission
7	Can add group	3	add_group
8	Can change group	3	change_group
9	Can delete group	3	delete_group
10	Can add user	4	add_user
11	Can change user	4	change_user
12	Can delete user	4	delete_user
13	Can add content type	5	add_contenttype
14	Can change content type	5	change_contenttype
15	Can delete content type	5	delete_contenttype
16	Can add session	6	add_session
17	Can change session	6	change_session
18	Can delete session	6	delete_session
19	Can add address	7	add_address
20	Can change address	7	change_address
21	Can delete address	7	delete_address
25	Can add locality	9	add_locality
26	Can change locality	9	change_locality
27	Can delete locality	9	delete_locality
28	Can add member profile	10	add_memberprofile
29	Can change member profile	10	change_memberprofile
30	Can delete member profile	10	delete_memberprofile
\.


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('auth_permission_id_seq', 30, true);


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$24000$flJ4ZRRQEhQd$e3ND1Ugb3v1cfirCxNUuHUJ/qP2r9TSMi+A5IXtoxGY=	2016-06-07 20:29:11+00	t	hebronlin@gmail.com	Hebron	Lin	hebronlin@gmail.com	t	t	2016-04-28 23:52:41+00
4	pbkdf2_sha256$24000$5IfJ5W8PdjFO$caHJjg/zJY8crWGlEF3SMkZgOwVMYcuY7rBLvGxTXzo=	\N	f	test2lin@gmail.com	Test 2	Lin	test2lin@gmail.com	f	f	2016-06-09 20:26:58.812389+00
5	pbkdf2_sha256$24000$WnDoIeQhPWQ7$st4gz+iv/q3dYCUeVMqhU+1xTgBOdQUFzScf0RONpgE=	\N	f	test3lin@gmail.com	Test 3	Lin	test3lin@gmail.com	f	f	2016-06-09 20:31:18.674931+00
3	pbkdf2_sha256$24000$jtpxBo9B9F6R$GLt/P23jBvGiVJHeVOwFCMWOjF6ebqhkSev9QuRtigQ=	\N	f	hlin@taluslabs.com	Test 1	Lin	hlin@taluslabs.com	f	f	2016-06-08 20:00:59+00
6	pbkdf2_sha256$24000$gTHgthM569RN$OWUPN8hTk7/IHGPlBFePy1y4N1cZ+dvexrMEmxBjtyQ=	\N	f	test6lin@gmail.com	Test 6	Lin	test6lin@gmail.com	f	f	2016-06-09 21:14:39.16934+00
7	pbkdf2_sha256$24000$bI6YcSFwmWh5$uUHnLdfXRCGADRhbBuZZB7DN+vH48jB04xIC29Ll94g=	\N	f	test7lin@gmail.com	Test 7	Lin	test7lin@gmail.com	f	f	2016-06-09 22:03:40.981852+00
8	pbkdf2_sha256$24000$hvpCQ8e2dPyx$wGZlbuz4RR/eiv0bcHpf94yOyRKpd5Of6iWYk3mGWIw=	\N	t	cindy45lin@gmail.com	Cindy	Lin	cindy45lin@gmail.com	t	t	2016-06-14 01:41:14+00
9	pbkdf2_sha256$24000$5XdpMSziZmYi$dOpeuv+1z9sfcjTjxXiEFqXwhesOjQVSvEd6b6jqoQg=	\N	t	ezrlin@gmail.com	Eric	Lin	ezrlin@gmail.com	t	t	2016-06-14 01:42:52+00
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('auth_user_id_seq', 9, true);


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('auth_user_user_permissions_id_seq', 1, false);


--
-- Data for Name: core_address; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY core_address (id, address1, address2, city, state, zip_code, country) FROM stdin;
\.


--
-- Name: core_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('core_address_id_seq', 1, false);


--
-- Data for Name: core_locality; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY core_locality (id, city, address_id) FROM stdin;
\.


--
-- Name: core_locality_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('core_locality_id_seq', 1, false);


--
-- Data for Name: core_memberprofile; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY core_memberprofile (user_id, middle_name, nick_name, deleted, timezone, locale, phone, locality_id) FROM stdin;
1	\N	\N	f	UTC	en_US	\N	\N
4	\N	\N	f	UTC	en_US	\N	\N
5	\N	\N	f	UTC	en_US	\N	\N
3	\N	\N	f	UTC	en_US	\N	\N
6	\N	\N	f	UTC	en_US	\N	\N
7	\N	\N	f	UTC	en_US	\N	\N
8	\N	\N	f	UTC	en_US	\N	\N
9	\N	\N	f	UTC	en_US	\N	\N
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2016-06-08 20:00:59.462245+00	3	hlin@taluslabs.com	1	Added.	4	1
2	2016-06-08 20:26:05.471876+00	1	hebronlin@gmail.com	2	Changed first_name, last_name and email.	4	1
3	2016-06-08 20:27:45.595215+00	3	hlin@taluslabs.com	2	Changed first_name, last_name, email and is_active.	4	1
4	2016-06-14 01:41:14.571101+00	8	cindy45lin@gmail.com	1	Added.	4	1
5	2016-06-14 01:41:49.932903+00	8	cindy45lin@gmail.com	2	Changed first_name, last_name, email and is_superuser.	4	1
6	2016-06-14 01:42:20.689055+00	8	cindy45lin@gmail.com	2	Changed is_staff.	4	1
7	2016-06-14 01:42:52.279995+00	9	ezrlin@gmail.com	1	Added.	4	1
8	2016-06-14 01:43:06.955641+00	9	ezrlin@gmail.com	2	Changed first_name, last_name, email, is_staff and is_superuser.	4	1
\.


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('django_admin_log_id_seq', 8, true);


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	core	address
9	core	locality
10	core	memberprofile
\.


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('django_content_type_id_seq', 10, true);


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2016-04-28 23:47:40.802867+00
2	auth	0001_initial	2016-04-28 23:47:40.839834+00
3	admin	0001_initial	2016-04-28 23:47:40.85685+00
4	admin	0002_logentry_remove_auto_add	2016-04-28 23:47:40.871624+00
5	contenttypes	0002_remove_content_type_name	2016-04-28 23:47:40.899743+00
6	auth	0002_alter_permission_name_max_length	2016-04-28 23:47:40.909732+00
7	auth	0003_alter_user_email_max_length	2016-04-28 23:47:40.919713+00
8	auth	0004_alter_user_username_opts	2016-04-28 23:47:40.931134+00
9	auth	0005_alter_user_last_login_null	2016-04-28 23:47:40.959759+00
10	auth	0006_require_contenttypes_0002	2016-04-28 23:47:40.961122+00
11	auth	0007_alter_validators_add_error_messages	2016-04-28 23:47:40.970584+00
12	sessions	0001_initial	2016-04-28 23:47:40.976409+00
13	core	0001_initial	2016-05-19 04:07:35.484153+00
\.


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: app_user
--

SELECT pg_catalog.setval('django_migrations_id_seq', 13, true);


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: app_user
--

COPY django_session (session_key, session_data, expire_date) FROM stdin;
sg84n5um5k8thziws3e17uvdvk0uo9oo	ZTIxZTJiOWE2ODM2MDY5NTUzNjk2MTU4NDM5ZmIxNWI4NWFhZTI4YTp7Il9hdXRoX3VzZXJfaGFzaCI6ImQyNzg4MmQxMWJkNTA5YjAyNTFjYjE5ZDdlYTRhYzMzYTZmYjM1MjgiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2016-05-13 17:40:15.798866+00
l90tkugmtq1rpqdxvnfrga6covlps4n2	ZTIxZTJiOWE2ODM2MDY5NTUzNjk2MTU4NDM5ZmIxNWI4NWFhZTI4YTp7Il9hdXRoX3VzZXJfaGFzaCI6ImQyNzg4MmQxMWJkNTA5YjAyNTFjYjE5ZDdlYTRhYzMzYTZmYjM1MjgiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=	2016-06-02 04:11:42.118938+00
aa2umy5swop6i38f4tp6jabcau8aa59k	OGYyZDVjMWJlMDY2Yzk2ZGIzZThkMzNlNTQxZGUzNTczNjNjZjM3Njp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjc4ODJkMTFiZDUwOWIwMjUxY2IxOWQ3ZWE0YWMzM2E2ZmIzNTI4In0=	2016-06-21 20:29:11.416901+00
\.


--
-- Name: auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions_group_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission_content_type_id_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups_user_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions_user_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: core_address_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY core_address
    ADD CONSTRAINT core_address_pkey PRIMARY KEY (id);


--
-- Name: core_locality_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY core_locality
    ADD CONSTRAINT core_locality_pkey PRIMARY KEY (id);


--
-- Name: core_memberprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY core_memberprofile
    ADD CONSTRAINT core_memberprofile_pkey PRIMARY KEY (user_id);


--
-- Name: django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type_app_label_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_app_label_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: app_user; Tablespace: 
--

ALTER TABLE ONLY django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX auth_group_name_a6ea08ec_like ON auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_0e939a4f; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX auth_group_permissions_0e939a4f ON auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_8373b171; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX auth_group_permissions_8373b171 ON auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_417f1b1c; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX auth_permission_417f1b1c ON auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_0e939a4f; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX auth_user_groups_0e939a4f ON auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_e8701ad4; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX auth_user_groups_e8701ad4 ON auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_8373b171; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX auth_user_user_permissions_8373b171 ON auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_e8701ad4; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX auth_user_user_permissions_e8701ad4 ON auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX auth_user_username_6821ab7c_like ON auth_user USING btree (username varchar_pattern_ops);


--
-- Name: core_locality_ea8e5d12; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX core_locality_ea8e5d12 ON core_locality USING btree (address_id);


--
-- Name: core_memberprofile_7e3ea948; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX core_memberprofile_7e3ea948 ON core_memberprofile USING btree (locality_id);


--
-- Name: django_admin_log_417f1b1c; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX django_admin_log_417f1b1c ON django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_e8701ad4; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX django_admin_log_e8701ad4 ON django_admin_log USING btree (user_id);


--
-- Name: django_session_de54fa62; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX django_session_de54fa62 ON django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: app_user; Tablespace: 
--

CREATE INDEX django_session_session_key_c0390e0f_like ON django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: auth_group_permiss_permission_id_84c5c92e_fk_auth_permission_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permiss_permission_id_84c5c92e_fk_auth_permission_id FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permiss_content_type_id_2f476e4b_fk_django_content_type_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permiss_content_type_id_2f476e4b_fk_django_content_type_id FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_per_permission_id_1fbb5f2c_fk_auth_permission_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_per_permission_id_1fbb5f2c_fk_auth_permission_id FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_locality_address_id_32e14f5b_fk_core_address_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY core_locality
    ADD CONSTRAINT core_locality_address_id_32e14f5b_fk_core_address_id FOREIGN KEY (address_id) REFERENCES core_address(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_memberprofile_locality_id_c00f557f_fk_core_locality_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY core_memberprofile
    ADD CONSTRAINT core_memberprofile_locality_id_c00f557f_fk_core_locality_id FOREIGN KEY (locality_id) REFERENCES core_locality(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: core_memberprofile_user_id_1a0dfd2f_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY core_memberprofile
    ADD CONSTRAINT core_memberprofile_user_id_1a0dfd2f_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_content_type_id_c4bce8eb_fk_django_content_type_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_content_type_id_c4bce8eb_fk_django_content_type_id FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: app_user
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


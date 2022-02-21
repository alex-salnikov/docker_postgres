-- Schema: World --------------------------

DROP SCHEMA IF EXISTS world CASCADE;
CREATE SCHEMA IF NOT EXISTS world;
SET search_path TO world;
SHOW search_path;


-- Table: Island --------------------------
DROP TABLE IF EXISTS island CASCADE;
CREATE TABLE island (
  island_id   SERIAL PRIMARY KEY,
  name        VARCHAR(20) DEFAULT 'Wonderland'
);
-- ALTER TABLE IF EXISTS world.island
--   OWNER to root;


-- Table: Hotel --------------------------
DROP TABLE IF EXISTS hotel CASCADE;
CREATE TABLE hotel (
  hotel_id  SERIAL PRIMARY KEY,
  island_id INTEGER REFERENCES island ON DELETE CASCADE NOT NULL,
  name      VARCHAR(20) DEFAULT 'Wonderland' NOT NULL,
  capacity  INTEGER DEFAULT 0 NOT NULL
);
-- ALTER TABLE IF EXISTS world.hotel
--   OWNER to root;


-- CREATE TABLE films (
--     code        char(5) CONSTRAINT firstkey PRIMARY KEY,
--     title       varchar(40) NOT NULL,
--     did         integer NOT NULL,
--     date_prod   date,
--     kind        varchar(10),
--     len         interval hour to minute
-- );


-- Docs
-- https://www.postgresql.org/docs/12/
-- https://postgrespro.ru/docs/postgresql/12/sql
-- https://devdocs.io/postgresql~12/

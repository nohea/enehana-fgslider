-- createschema.sql

-- create db

-- sudo -u postgres psql
-- create database fgslider;
-- create user fgslider with encrypted password 'fgslider';
-- grant all privileges on database fgslider to fgslider;
-- psql -h localhost -U fgslider -W fgslider

-- create schema

create table ratingtick (
    id serial,
    focusgroup text not null,
    username text not null,
    rating integer not null,
    tick_ts timestamp with time zone not null default current_timestamp
);

-- insert into ratingtick(focusgroup, username, rating) values ('pepsi ad', 'ekolu', 50);
-- insert into ratingtick(focusgroup, username, rating) values ('pepsi ad', 'ekolu', 65);
-- insert into ratingtick(focusgroup, username, rating) values ('pepsi ad', 'ekolu', 43);
-- insert into ratingtick(focusgroup, username, rating) values ('pepsi ad', 'ekolu', 21);

create table roles(
    pk uuid primary key default uuid(),
    name citext unique not null,
    notes text,
    check(
        char_length(name)<=50 and
        char_length(notes)<=1000
    )
);

create table users(
    pk uuid primary key default uuid(),
    role uuid references roles(pk) on delete set null,
    firstname text not null,
    lastname text not null,
    email mail unique not null,
    username citext unique not null,
    password text not null,
    is_active bool not null,
    notes text,
    check(
        char_length(firstname)<=255 and
        char_length(lastname)<=255 and
        char_length(username)<=255 and
        char_length(notes)<=1000
    )
);

create table error_logs_json(
    pk uuid primary key default uuid(),
    message text,
    error jsonb,
    data jsonb
);

create table brands(
    pk uuid primary key default uuid(),
    name citext unique not null,
    notes text,
    is_active bool not null,
    check(
        char_length(name)<=255 and
        char_length(notes)<=1000
    )
);

create table party.vendors(
    pk uuid primary key default uuid(),
    id citext unique,
    name text not null,
    phone citext unique,
    email mail unique,
    address text,
    notes text,
    is_active bool not null,
    check(
        char_length(id)<=100 and
        char_length(name)<=255 and
        char_length(phone)<=50 and
        char_length(address)<=1000 and
        char_length(notes)<=1000
    )
);

create table party.customers(
    pk uuid primary key default uuid(),
    id citext unique,
    name text not null,
    phone citext unique,
    email mail unique,
    address text,
    notes text,
    is_active bool not null,
    check (
        char_length(id)<=100 and
        char_length(name)<=255 and
        char_length(phone)<=50 and
        char_length(address)<=1000 and
        char_length(notes)<=1000
    )
);

create table product.types(
    pk uuid primary key default uuid(),
    name citext unique not null,
    notes text,
    is_active bool not null,
    check (
        char_length(name)<=255 and
        char_length(notes)<=1000
    )
);

create table product.selves(
    pk uuid primary key default uuid(),
    barcode citext unique,
    name citext unique not null,
    type uuid not null references product.types(pk),
    brand uuid not null references brands(pk),
    serial_number citext unique,
    model_number text,
    notes text,
    check (
        char_length(barcode)<=100 and
        char_length(name)<=255 and
        char_length(serial_number)<=100 and
        char_length(model_number)<=100 and
        char_length(notes)<=1000
    )
);

create table product.price_histories(
    pk uuid primary key default uuid(),
    product uuid not null references product.selves(pk) on delete cascade,
    amount float not null,
    notes text,
    check(char_length(notes)<=1000)
);

create table product.current_prices(
    product uuid primary key references product.selves(pk) on delete cascade,
    price_history uuid not null references product.price_histories(pk) on delete cascade
);

create table product.inventories(
    pk uuid primary key default uuid(),
    id citext unique,
    vendor uuid not null references party.vendors(pk),
    datetime timestamptz not null,
    notes text,
    check (
        char_length(id)<=100 and
        char_length(notes)<=1000
    )
);

create table product.inventory_items(
    pk uuid primary key default uuid(),
    inventory uuid not null references product.inventories(pk),
    product uuid not null references product.selves(pk),
    quantity int not null,
    cost float not null,
    notes text,
    check (char_length(notes)<=1000)
);

create table product.outflows(
    pk uuid primary key default uuid(),
    id citext unique,
    customer uuid not null references party.customers(pk),
    datetime timestamptz not null,
    notes text,
    check(
        char_length(id)<=100 and
        char_length(notes)<=1000
    )
);

-- the old one which was the outflows was separated
create table product.outflow_items(
    pk uuid primary key default uuid(),
    outflow uuid not null references product.outflows(pk),
    product uuid not null references product.selves(pk),
    price uuid not null references product.price_histories(pk),
    quantity int not null,
    notes text,
    check (char_length(notes)<=1000)
);
-- ends here

-- the new one which is connected to new outflows table under public schema
drop table product.outflow_items;
create table product.outflow_items(
    pk uuid primary key default uuid(),
    outflow uuid not null references outflows(pk),
    product uuid not null references product.selves(pk),
    price uuid not null references product.price_histories(pk),
    quantity int not null,
    notes text,
    check (char_length(notes)<=1000)
);
-- ends here

create table product.inflows(
    pk uuid primary key default uuid(),
    id citext unique,
    customer uuid not null references party.customers(pk),
    datetime timestamptz not null,
    notes text,
    check(
        char_length(id)<=100 and
        char_length(notes)<=1000
    )
);

create table product.inflow_details(
    pk uuid primary key default uuid(),
    inflow uuid not null references product.inflows(pk),
    outflow uuid not null references product.outflows(pk),
    amount float not null,
    discount float not null default 0,
    notes text,
    check(char_length(notes)<=1000)
);

create table service.selves(
    pk uuid primary key default uuid(),
    id citext unique,
    name citext unique not null,
    notes text,
    check(
        char_length(id)<=100 and
        char_length(name)<=255 and
        char_length(notes)<=1000
    )
);

create table service.price_histories(
    pk uuid primary key default uuid(),
    service uuid not null references service.selves(pk) on delete cascade,
    amount float not null
);

create table service.current_prices(
    service uuid primary key references service.selves(pk) on delete cascade,
    price_history uuid not null references service.price_histories(pk) on delete cascade
);

create table repair.devices(
    pk uuid primary key default uuid(),
    brand uuid references brands(pk),
    customer uuid not null references party.customers(pk),
    model_number text,
    serial_number citext unique,
    notes text,
    check (
        char_length(model_number)<=100 and
        char_length(serial_number)<=100 and
        char_length(notes) <= 1000
    )
);

create table repair.statuses(
    pk uuid primary key default uuid(),
    name citext unique not null,
    notes text,
    check(
        char_length(name)<=255 and
        char_length(notes)<=1000
    )
);

create table repair.tickets(
    pk uuid primary key default uuid(),
    id citext unique,
    customer uuid not null references party.customers(pk),
    device uuid not null references repair.devices(pk),
    datetime timestamptz not null,
    estimated_amount float not null default 0,
    problem text,
    check(
        char_length(id)<=100 and
        char_length(problem)<=1000
    )
);

create table repair.ticket_statuses(
    pk uuid primary key default uuid(),
    ticket uuid not null references repair.tickets(pk),
    status uuid not null references repair.statuses(pk),
    datetime timestamptz not null default current_timestamp
);

create table repair.outflows(
    pk uuid primary key default uuid(),
    id citext unique,
    customer uuid not null references party.customers(pk),
    ticket uuid not null references repair.tickets(pk),
    datetime timestamptz not null,
    notes text,
    check(
        char_length(id)<=100 and
        char_length(notes)<=1000
    )
);

-- the new outflow which is created in the public schema to make the outflows table general
create table outflows(
    pk uuid primary key default uuid(),
    id citext unique,
    customer uuid not null references party.customers(pk),
    datetime timestamptz not null,
    notes text,
    check(
        char_length(id)<=100 and
        char_length(notes)<=1000
    )
);

create table repair.outflow_tickets(
    pk uuid primary key default uuid(),
    outflow uuid not null references outflows(pk) on delete cascade,
    ticket uuid not null references repair.tickets(pk) on delete cascade
);
-- ends here the new tables

-- old one, connected to the stand-alone outflows
create table repair.outflow_services(
    pk uuid primary key default uuid(),
    outflow uuid not null references repair.outflows(pk),
    service uuid not null references service.selves(pk),
    price uuid not null references service.price_histories(pk),
    duration interval not null,
    notes text,
    check(char_length(notes)<=1000)
);

create table repair.outflow_items(
    pk uuid primary key default uuid(),
    outflow uuid not null references repair.outflows(pk),
    product uuid not null references product.selves(pk),
    price uuid not null references product.price_histories(pk),
    quantity int not null,
    notes text,
    check(char_length(notes)<=1000)
);
-- ends here

-- new one, connected to the combined outflows
create table repair.outflow_services(
    pk uuid primary key default uuid(),
    outflow uuid not null references outflows(pk),
    service uuid not null references service.selves(pk),
    price uuid not null references service.price_histories(pk),
    duration interval not null,
    notes text,
    check(char_length(notes)<=1000)
);
drop table repair.outflow_items;
create table repair.outflow_items(
    pk uuid primary key default uuid(),
    outflow uuid not null references outflows(pk),
    product uuid not null references product.selves(pk),
    price uuid not null references product.price_histories(pk),
    quantity int not null,
    notes text,
    check(char_length(notes)<=1000)
);
-- ends here

create table repair.inflows(
    pk uuid primary key default uuid(),
    id text unique,
    customer uuid not null references party.customers(pk),
    datetime timestamptz not null,
    notes text,
    check(
        char_length(id)<=100 and
        char_length(notes)<=1000
    )
);

create table repair.inflow_details(
    pk uuid primary key default uuid(),
    inflow uuid not null references repair.inflows(pk),
    outflow uuid not null references repair.outflows(pk),
    amount float not null,
    discount float not null default 0,
    notes text,
    check(char_length(notes) <= 1000)
);

drop table error_logs_json;
drop table repair.inflow_details;
drop table repair.inflows;
drop table repair.outflow_items;
drop table repair.outflow_services;
drop table repair.outflows;
drop table repair.ticket_statuses;
drop table repair.tickets;
drop table repair.statuses;
drop table repair.devices;
drop table service.current_prices;
drop table service.price_histories;
drop table service.selves;
drop table product.inflow_details;
drop table product.inflows;
drop table product.outflow_items;
drop table product.outflows;
drop table product.inventory_items;
drop table product.inventories;
drop table product.current_prices;
drop table product.price_histories;
drop table product.selves;
drop table product.types;
drop table party.customers;
drop table party.vendors;
drop table brands;
drop table users;
drop table roles;




























































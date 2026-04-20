create table audit.operators(
    id smallint primary key generated always as identity,
    name varchar(10)
);

-- drop table audit.audits;
create table audit.audits(
    pk uuid primary key default uuid(),
    operation smallint not null references audit.operators(id),
    actor uuid not null,
    table_schema text not null,
    table_name text not null,
    record jsonb not null
);

create function audit.set_user(id uuid) returns void
as $$
    begin
        if id is null then
            raise exception 'User ID cannot be null';
        end if;

        perform set_config('pos.actor', id::text, true);
    end;
$$language plpgsql;

create function audit.skip_if_unchanged() returns trigger
as $$
    begin
        if new is not distinct from old then
            return null;
        end if;

        return new;
    end;
$$language plpgsql;

create function audit.tr_record() returns trigger
as $$
    begin
        insert into audit.audits(operation, actor, table_schema, table_name, record)
        values(
                (select id from audit.operators where name = tg_op),
                current_setting('pos.actor')::uuid,
               tg_table_schema,
               tg_table_name,
               jsonb_strip_nulls(to_jsonb(coalesce(new,old)))
              );

        return coalesce(new, old);
    end;
$$language plpgsql;

create trigger skip_if_unchanged
before update on roles for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on users for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on brands for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on party.vendors for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on party.customers for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on product.types for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on product.selves for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on product.price_histories for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on product.current_prices for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on product.inventories for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on product.inventory_items for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on product.outflows for each row
execute function audit.skip_if_unchanged();

-- the new outflows table in public schema
create trigger skip_if_unchanged
before update on outflows for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on repair.outflow_tickets for each row
execute function audit.skip_if_unchanged();
-- ends here

create trigger skip_if_unchanged
before update on product.outflow_items for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on product.inflows for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on product.inflow_details for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on service.selves for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on service.price_histories for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on service.current_prices for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on repair.devices for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on repair.statuses for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on repair.tickets for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on repair.ticket_statuses for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on repair.outflows for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on repair.outflow_services for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on repair.outflow_items for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on repair.inflows for each row
execute function audit.skip_if_unchanged();

create trigger skip_if_unchanged
before update on repair.inflow_details for each row
execute function audit.skip_if_unchanged();


-- after trigger
-- drop trigger tr_audit on roles;
create trigger tr_audit
after insert or update or delete on roles
for each row
execute function audit.tr_record();

-- drop trigger tr_audit on users;
create trigger tr_audit
after insert or update or delete on users
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on brands
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on party.vendors
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on party.customers
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on product.types
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on product.selves
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on product.price_histories
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on repair.inflow_details
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on repair.inflows
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on repair.outflow_items
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on repair.outflow_services
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on repair.outflows
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on repair.ticket_statuses
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on repair.tickets
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on repair.statuses
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on repair.devices
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on service.current_prices
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on service.price_histories
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on service.selves
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on product.inflow_details
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on product.inflows
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on product.outflow_items
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on product.outflows
for each row
execute function audit.tr_record();

-- new outflows table which is created under public schema
create trigger tr_audit
after insert or update or delete on outflows
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on repair.outflow_tickets
for each row
execute function audit.tr_record();
-- ends here

create trigger tr_audit
after insert or update or delete on product.inventory_items
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on product.inventories
for each row
execute function audit.tr_record();

create trigger tr_audit
after insert or update or delete on product.current_prices
for each row
execute function audit.tr_record();










































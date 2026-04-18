drop domain mail;
create domain mail as citext
check(
    value ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    and
    char_length(value) <= 255
);

create schema party;
create schema product;
create schema service;
create schema repair;
create schema audit;
create schema error;

create extension if not exists citext;

create function uuid() returns uuid as $$
    begin
        return uuidv7();
    end;
$$language plpgsql;

select uuid();

-- drop function clean_object;
create function clean_object(jsonb)
returns jsonb
as $$
    begin
        return (select jsonb_object_agg(key, value)
        from(
            select
                key,
                case jsonb_typeof(value)
                    when 'string'
                    then to_jsonb(nullif(trim($1->>key),''))
                    else to_jsonb(value)
                end as value
            from jsonb_each($1)
        ));
    end;
$$ language plpgsql;


drop function extract_datetime;
CREATE FUNCTION extract_datetime(uuid) returns timestamptz
AS $$
    SELECT TO_TIMESTAMP(('x' || REPLACE($1::text, '-', ''))::bit(48)::bigint / 1000);
$$ language sql immutable parallel safe;

-- drop function get_duration;
create function get_duration(interval)
returns jsonb
as $$
    begin
        return jsonb_build_object(
            'duration', $1::interval,
            'hours', extract(epoch from $1::interval) / 3600
        );
    end;
$$ language plpgsql;

-- drop function get_durations;
create function get_durations(jsonb)
returns jsonb
as $$
    declare result jsonb;
    begin
        if $1 is not null and jsonb_typeof($1) = 'array' then
            select jsonb_agg(r) into result from(
                select
                    args.pk,
                    s.name as service,
                    args.outflow,
                    ph.amount as price,
                    ph.amount * (extract(epoch from args.duration)/3600) as total,
                    args.duration,
                    args.notes
                from rows from (
                    jsonb_to_recordset($1::jsonb)
                    as (pk uuid, service uuid, outflow uuid, price uuid, duration interval, notes text)
                ) with ordinality as args(pk, service, outflow, price, duration, notes, index)
                join service.selves as s on args.service = s.pk
                join service.price_histories ph on args.price = ph.pk
                order by args.index
            ) as r;

            return result;
        end if;
    end;
$$ language plpgsql;

create extension if not exists pg_trgm;
create extension if not exists btree_gin;
create index idx_customers_name_trgm on party.customers using gin(name gin_trgm_ops);

create index idx_customers_name_prefix on party.customers(name text_pattern_ops);
drop index party.idx_customers_name_prefix;
drop index party.idx_customers_name_trgm;

ALTER SYSTEM SET pg_trgm.similarity_threshold = 0.3;
SELECT pg_reload_conf();

alter table party.customers
add column search_vector text
generated always as (lower(coalesce(id,'')) || ' ' || lower(coalesce(name,'')) || ' ' || lower(coalesce(phone, '')) || ' ' || lower(coalesce(email, ''))) stored;

drop index party.idx_customers_search_vector_trgm;
create index idx_customers_search_vector_trgm on party.customers using gin(search_vector gin_trgm_ops);

alter table party.customers drop column search_vector;
alter table party.customers
add column search_vector text
generated always as (
    lower(coalesce(name,'')) || ' ' ||
    lower(coalesce(phone, '')) || ' ' ||
    lower(coalesce(email, '')) || ' ' ||
    lower(coalesce(id,''))
) stored;

alter table party.vendors
add column search_vector text
generated always as(
    lower(coalesce(name,'')) || ' ' ||
    lower(coalesce(phone, '')) || ' ' ||
    lower(coalesce(email, '')) || ' ' ||
    lower(coalesce(id,''))
) stored;

create index idx_vendor_search_vector_trgm on party.vendors using gin(search_vector gin_trgm_ops);

alter table product.selves
add column search_vector text
generated always as(
    lower(coalesce(name,'')) || ' ' ||
    lower(coalesce(barcode,'')) || ' ' ||
    lower(coalesce(serial_number,'')) || ' ' ||
    lower(coalesce(model_number, ''))
) stored;

create index idx_product_self_search_vector_trgm on product.selves using gin(search_vector gin_trgm_ops);










































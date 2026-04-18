-- drop function party.customer_by_pk;
create function party.customer_by_pk(uuid)
returns jsonb
as $$
    declare customer jsonb;
    begin
        select jsonb_build_object(
            'pk', c.pk,
            'id', c.id,
            'name', c.name,
            'phone', c.phone,
            'email', c.email,
            'address', c.address,
            'notes', c.notes,
            'active', c.is_active
        ) into customer
        from party.customers c
        where c.pk = $1;

        if customer is null then
            perform error.not_found();
        end if;

        return customer;
    end;
$$language plpgsql;

-- drop function party.save_customer;
create function party.save_customer(user_id uuid, jsonb)
returns jsonb
as $$
 begin
     perform audit.set_user(user_id);

     insert into party.customers(pk, id, name, phone, email, address, notes, is_active)
     select
         customer.pk,
         customer.id,
         customer.name,
         customer.phone,
         customer.email,
         customer.address,
         customer.notes,
         customer.active
     from jsonb_to_record(clean_object($2))
     as customer(pk uuid, id text, name text, phone text, email text, address text, notes text, active bool)

     on conflict (pk)
     do update set
        id =        excluded.id,
        name =      excluded.name,
        phone =     excluded.phone,
        email =     excluded.email,
        address =   excluded.address,
        notes =     excluded.notes,
        is_active = excluded.is_active;
     return party.customer_by_pk(($2->>'pk')::uuid);
 end;
$$language plpgsql;

-- drop function party.remove_customer;
create function party.remove_customer(user_id uuid, pk_ uuid)
returns setof party.customers
as $$
    begin
        perform audit.set_user(user_id);
        return query
            delete from party.customers
            where pk = pk_
            returning *;
        if not found then
            perform error.not_found();
        end if;
    end;
$$language plpgsql;

drop function party.customer_list;
create function party.customer_list(qry jsonb default null)
returns table(
    pk uuid,
    id citext,
    name text,
    phone citext,
    email mail,
    address text,
    notes text,
    active bool,
    created timestamptz)
as $$
declare
    limit_  int  := coalesce((qry ->> 'limit')::int, 750);
    offset_ int  := coalesce((qry ->> 'page')::int,0) * limit_;
    pk_ uuid := nullif(qry->>'pk','')::uuid;
    search_ text := nullif(lower(trim(qry ->> 'search')), '')::text;
    sql_ text;

begin
    if pk_ is not null then
        return query
        select
            c.pk, c.id, c.name, c.phone, c.email, c.address, c.notes, c.is_active, extract_datetime(c.pk)
        from party.customers c
        where c.pk >= pk_
        order by c.pk limit limit_;
        return;
    end if;

    if search_ is null then
        return query
        select
            c.pk, c.id, c.name, c.phone, c.email, c.address, c.notes, c.is_active, extract_datetime(c.pk)
        from party.customers c
        order by c.pk limit limit_ offset offset_;
        return;
    end if;

    sql_ := format('
        select
            c.pk, c.id, c.name, c.phone, c.email, c.address, c.notes, c.is_active, extract_datetime(c.pk)
        from party.customers c
        where c.search_vector %s
        order by position($3 in c.search_vector), search_vector
        limit $1 offset $2',
        case when length(search_) <= 25
            then 'like ''%''||$3||''%'''
            else '% $3'
        end
    );

    return query execute sql_ using limit_, offset_, search_;
end;
$$ language plpgsql;

select * from party.customer_list('{
  "search": "abcdef"
}');

select * from party.customers where search_vector like '%tferrell@%';
explain analyze
select
    similarity('a',search_vector) as score,*
from party.customers where search_vector like '%a%' order by score desc;

explain analyze
select
    position('a' in search_vector) as pos, *
from party.customers where search_vector like '%a%' order by pos;

explain analyze
select
    (position('ali' in search_vector)) as pos, *
from party.customers where search_vector like '%ali%' order by pos;


select max(length(search_vector)) as total from party.customers;

select * from party.customers where pk >= '019c5154-6051-72f1-af8d-19afb6b40e35'::uuid order by pk limit 2;



























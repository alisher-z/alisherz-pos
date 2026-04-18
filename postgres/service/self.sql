-- drop function service.self_by_pk;
create function service.self_by_pk(uuid)
returns jsonb
as $$
    declare self jsonb;
    begin
        select
            jsonb_build_object(
                'pk', s.pk,
                'id', s.id,
                'name', s.name,
                'notes', s.notes,
                'price', case when ph.pk is not null then
                    jsonb_build_object(
                        'pk', ph.pk,
                        'amount', ph.amount
                    ) end
            ) into self
        from service.selves as s
        left join service.current_prices as cp on s.pk = cp.service
        left join service.price_histories as ph on cp.price_history = ph.pk
        where s.pk = $1;

        if self is null then
            perform error.not_found();
        end if;

        return self;
    end;
$$ language plpgsql;

select * from service.selves;

select * from service.price_histories;

select * from service.current_prices;

select
    jsonb_build_object(
        'pk', s.pk,
        'id', s.id,
        'name', s.name,
        'notes', s.notes,
        'price', case when ph.pk is not null then
            jsonb_build_object(
                'pk', ph.pk,
                'amount', ph.amount
            ) end
    )
from service.selves as s
left join service.current_prices as cp on s.pk = cp.service
left join service.price_histories as ph on cp.price_history = ph.pk;

-- drop function service.save_self;
create function service.save_self(user_id uuid, data jsonb)
returns jsonb
as $$
    declare
        service jsonb := clean_object(data->'service')::jsonb;
        history jsonb := (data->'history')::jsonb;
    begin
        perform audit.set_user(user_id);

        insert into service.selves(pk, id, name, notes)
        select s.pk, s.id, s.name, s.notes
        from jsonb_to_record(service)
        as s(pk uuid, id text, name text, notes text)

        on conflict(pk) do update set
            id = excluded.id,
            name = excluded.name,
            notes = excluded.notes;

        if history is not null then
            perform service.save_price_history(user_id, jsonb_build_object('history', history));
        end if;

        return service.self_by_pk((data->'service'->>'pk')::uuid);
    end;
$$ language plpgsql;


select jsonb_build_object(
    'pk', uuid(),
    'id', md5(random()::text),
    'name', md5(random()::text),
    'notes', md5(random()::text)
);

-- drop function service.self_list;
create function service.self_list(qry jsonb default null)
returns table(pk uuid, id text, name text, notes text, price jsonb, created timestamptz)
as $$
    begin
        return query
            select
                s.pk,
                s.id::text,
                s.name::text,
                s.notes,
                jsonb_build_object(
                    'pk', ph.pk,
                    'amount', ph.amount
                ) as price,
                extract_datetime(s.pk)
            from service.selves s
            left join service.current_prices cp on s.pk = cp.service
            left join service.price_histories ph on cp.price_history = ph.pk;
    end;
$$ language plpgsql;

select * from service.self_by_pk('019bf737-96c9-7456-91f0-92b40c7b4e16');





































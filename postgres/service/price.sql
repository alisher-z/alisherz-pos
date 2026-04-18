-- drop function service.price_history_by_pk;
create function service.price_history_by_pk(uuid)
returns jsonb
as $$
    declare history jsonb;
    begin
        select jsonb_build_object(
            'pk', h.pk,
            'service', h.service,
            'amount', h.amount
        ) into history
        from service.price_histories h
        where h.pk = $1;

        if history is null then
            perform error.not_found();
        end if;

        return history;
    end;
$$ language plpgsql;

-- drop function service.save_price_history;
create function service.save_price_history(user_id uuid, data jsonb)
returns jsonb
as $$
    begin
        perform audit.set_user(user_id);

        if data ? 'service' then
            perform service.save_self(user_id, data->'service');
        end if;

        insert into service.price_histories(pk, service, amount)
        select
            p.pk, p.service, p.amount
        from jsonb_to_record(clean_object(data->'history'))
        as p(pk uuid, service uuid, amount float)

        on conflict(pk) do update set
            service = excluded.service,
            amount = excluded.amount;

        perform service.save_current_price(
            (data->'history'->>'service')::uuid,
            (data->'history'->>'pk')::uuid
        );

        return service.price_history_by_pk((data->'history'->>'pk')::uuid);
    end;
$$ language plpgsql;

-- drop function service.save_current_price;
create function service.save_current_price(uuid, uuid)
returns void
as $$
    begin
        insert into service.current_prices(service, price_history)
        values ($1, $2) on conflict(service) do update set
            service = excluded.service,
            price_history = excluded.price_history;
    end;
$$ language plpgsql;

select jsonb_build_object(
    'service', jsonb_build_object(
        'pk', uuid(),
        'id', md5(random()::text),
        'name', md5(random()::text),
        'notes', md5(random()::text)
    ),
    'history', jsonb_build_object(
        'pk', uuid(),
        'service', uuid(),
        'amount', random()
    )
);

-- drop function service.price_history_list;
create function service.price_history_list(qry jsonb default null)
returns table(pk uuid, service uuid, amount float, created timestamptz)
as $$
    begin
        return query
            select
                h.pk,
                h.service,
                h.amount,
                extract_datetime(h.pk)
            from service.price_histories h;
    end;
$$ language plpgsql;


select * from service.price_history_by_pk('019b1e07-99eb-78d0-b3ba-8608c1c3be13');






















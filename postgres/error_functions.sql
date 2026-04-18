drop function error.not_found();
create function error.not_found() returns jsonb
as $$
    begin
        raise exception 'Requested data does not exist'
            using
                errcode = 'PX404',
                hint = 'NotFoundException';

        return null;
    end;
$$ language plpgsql;

create function error.assert_array_not_empty(arr jsonb)
returns jsonb
as $$
    begin
        if jsonb_typeof(arr) <> 'array' then
            raise exception 'Input must be a JSONB array!'
                using
                    errcode = 'PX422',
                    hint = 'Ensure the input JSONB structure is enclosed in square brackets [].';
        end if;

        if arr is null or jsonb_array_length(arr) = 0 then
            raise exception 'Array cannot be empty. please provide at least one element in the array.'
                using
                    errcode = 'PX400',
                    hint = 'A non-NULL JSONB array must be provided.';
        end if;
        return null;
    end;
$$language plpgsql;
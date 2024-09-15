function set_key_json_recursive(obj, key, value) {
    for (let [current_key, current_value] of Object.entries(obj)) {
        if (current_key === key) {
            obj[current_key] = value;
        } else if (typeof current_value === 'object') {
            obj[current_key] = set_key_json_recursive(current_value, key, value);
        }
    }
    return obj;
}

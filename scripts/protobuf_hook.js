const changeInJson = (id, value, obj) => {
    for (const [k, v] of Object.entries(obj)) {
      if (k === id) {
        obj[k] = value;
      } else if (v && typeof v === "object") {
        changeInJson(id, value, v);
      }
    }
  }
 
 
 const initialize_protobuf_hook = () => {
    const handle_message = (message) => {
        console.log("Hi Tal!")
        console.log("message before", message)
        changeInJson("viewOnce", false, message)
        console.log("message after", message)
        return message;
    };
 
 
    const original_processor = MODULES.PROTOBUF_HOOK.verifyProtobufMessageObjectKeys;
    MODULES.PROTOBUF_HOOK.verifyProtobufMessageObjectKeys = function (message) {
        console.log("Hi Tal2!")
        const modified_message = handle_message(message);
        return original_processor(modified_message);
    };
 };
 
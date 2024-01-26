const RENDERABLE_PROCESSOR = 'processRenderableMsg'

const initialize_message_hook = () => {
    const original_processor = window.mR.findModule(RENDERABLE_PROCESSOR)[0].processRenderableMsg;
    window.mR.findModule(RENDERABLE_PROCESSOR)[0].processRenderableMsg = () => {

        return original_processor(...arguments);
    };
};

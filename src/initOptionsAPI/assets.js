import { ASSETS_TYPE } from '../utils/const'
export function initAssetsRegisters(Vue) {
    ASSETS_TYPE.forEach(type => {
        Vue[type] = function (id, definition) {
            console.log(id, definition)
            switch (type) {
                case 'component':
                  definition = this.options._base.extend(definition)
                    break;
                case 'directive':
                    break;
                case 'filter':
                    break;
            }
            this.options[type+'s'][id] = definition
        }
    })
}
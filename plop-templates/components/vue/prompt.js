
import { notEmpty } from '../../utils.js';

const componentGenerator = {
    description: 'generate vue component',//描述
    prompts: [{
        type: 'input',//问题类型
        name: 'name',//回应问题输入的答案,可做变量使用创建为组件名
        message: 'component name please',//提示
        validate: notEmpty('name')//校验方式
    },
    //其他模板内容选项,可选项
    {
        type: 'checkbox',
        name: 'blocks',
        message: 'Blocks:',
        choices: [{
            name: '<template>',
            value: 'template',
            checked: true
        },
        {
            name: '<script>',
            value: 'script',
            checked: true
        },
        {
            name: 'style',
            value: 'style',
            checked: true
        }
        ],
        validate(value) {
            if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
                return 'Components require at least a <script> or <template> tag.'
            }
            return true
        }
    }
    ],
    actions: data => {
        const name = '{{properCase name}}'
        const actions = [{
            type: 'add',
            path: `src/components/${name}/index.vue`,//新增文件的路径
            templateFile: 'plop-templates/components/vue/index.txt',//选择模板文件的路径
            data: {
                name: name,
                template: data.blocks.includes('template'),
                script: data.blocks.includes('script'),
                style: data.blocks.includes('style')
            }
        }]

        return actions
    }
};

export default componentGenerator;



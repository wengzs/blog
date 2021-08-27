module.exports = {
    title: 'Aiur',
    description: '',
    plugins: {
        'sitemap': {
            hostname: 'https://wengzhisong-hz.github.io'
        },
    },
    themeConfig: {
        nav: [
            { text: 'github', link: 'https://github.com/wengzhisong-hz' },
            { text: '算法笔记', link: 'https://wengzhisong-hz.github.io/algorithm/' }
        ],
        sidebar: [
            {
                title: '基础',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    {
                        title: 'C++',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Electron',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Java',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'JS & TS',
                        collapsable: false,
                        children: [
                            {
                                title: '手写代码',
                                path: '/basic/javascript/handWritten.md'
                            },
                            {
                                title: 'TS 补遗',
                                path: '/basic/javascript/ts.md'
                            },
                            {
                                title: 'TS 与依赖注入（DI）',
                                path: '/basic/javascript/di.md'
                            },
                            {
                                title: 'html & css',
                                path: '/basic/javascript/html&css.md'
                            },
                        ]
                    },
                    {
                        title: 'Linux',
                        collapsable: false,
                        children: [
                            {
                                title: 'Windows部署前端Linux开发环境',
                                path: '/basic/linux/wsl.md',
                            }
                        ]
                    },
                    {
                        title: 'Mongodb',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'MySQL',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Webpack',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Node',
                        collapsable: false,
                        children: [
                            {
                                title: '基础模块',
                                path: '/basic/node/basic.md'
                            },
                        ]
                    },
                    {
                        title: 'React',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Spring',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Vue',
                        collapsable: false,
                        children: [
                            {
                                title: 'vue 实现要点',
                                path: '/basic/vue/vueAnalysis.md'
                            }
                        ]
                    }
                ]
            },
            {
                title: '专题',
                path: '/topic/',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    {
                        title: 'Authorization',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'CMS',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '跨端',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '前端基建',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '直播',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '监控',
                        collapsable: false,
                        children: [
                            {
                                title: '在本地（mac）环境安装 ELK',
                                path: '/topic/log/deploy-local-elk.md',
                            }
                        ]
                    },
                    {
                        title: '低代码',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '主数据',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '微前端',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '用户中心',
                        collapsable: false,
                        children: []
                    }
                ]
            },
            {
                title: '管理',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    {
                        title: '招聘面试需要注意的一些细节',
                        path: '/management/interview.md'
                    },
                    {
                        title: '团队管理之激励篇',
                        path: '/management/team.md'
                    },
                ]
            },
            {
                title: '观点',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    {
                        title: '如何选择个人时间管理APP',
                        path: '/opinion/GTD.md'
                    },
                    {
                        title: '关于信息的一点思考',
                        path: '/opinion/message.md'
                    }
                ]
            }
        ]
    }
}

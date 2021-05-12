module.exports = {
    title: '宁静致远',
    description: '宁静致远',
    themeConfig: {
        nav: [
            { text: 'github', link: 'https://github.com/wengzhisong-hz' },
            { text: '算法笔记', link: 'https://wengzhisong-hz.github.io/algorithm/' }
        ],
        sidebar: [
            {
                title: '基础',
                path: '/basic/',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    {
                        title: 'C++',
                        path: '/basic/c++/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Electron',
                        path: '/basic/electron/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Java',
                        path: '/basic/java/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'JavaScript',
                        path: '/basic/javascript/',
                        collapsable: false,
                        children: [
                            {
                                title: '手写代码',
                                path: '/basic/javascript/handWritten.md'
                            },
                            {
                                title: 'ts补遗',
                                path: '/basic/javascript/ts.md'
                            },
                        ]
                    },
                    {
                        title: 'Linux',
                        path: '/basic/linux/',
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
                        path: '/basic/mongodb/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'MySQL',
                        path: '/basic/mysql/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Shell',
                        path: '/basic/shell/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Webpack',
                        path: '/basic/webpack/',
                        collapsable: false,
                        children: []
                    }
                ]
            },
            {
                title: '深入',
                path: '/deepin/',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    {
                        title: 'Koa',
                        path: '/deepin/koa/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Nest',
                        path: '/deepin/nest/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Node',
                        path: '/deepin/node/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'React',
                        path: '/deepin/react/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Spring',
                        path: '/deepin/spring/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'Vue',
                        path: '/deepin/vue/',
                        collapsable: false,
                        children: []
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
                        path: '/topic/authorization/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: 'CMS',
                        path: '/topic/cms/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '跨端',
                        path: '/topic/cross-platform/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '前端基建',
                        path: '/topic/fe-infrastructure/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '手写代码',
                        path: '/topic/handwriting/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '直播',
                        path: '/topic/live-streaming/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '监控平台',
                        path: '/topic/log/',
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
                        path: '/topic/low-code/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '主数据',
                        path: '/topic/main-data/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '微前端',
                        path: '/topic/micro-fe/',
                        collapsable: false,
                        children: []
                    },
                    {
                        title: '用户中心',
                        path: '/topic/user-center/',
                        collapsable: false,
                        children: []
                    }
                ]
            },
            {
                title: '管理',
                path: '/management/',
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
                path: '/opinion/',
                collapsable: false,
                sidebarDepth: 1,
                children: [
                    {
                        title: '如何选择个人时间管理APP',
                        path: '/opinion/GTD.md'
                    }
                ]
            }
        ]
    }
}

# ClipFlow UI 页面结构映射表

基于对 ui-v4 目录下所有 HTML 文件的分析，以下是 UI 页面结构映射表：

| 页面名称 | 对应的 UI 文件 | 页面功能点 | 页面需要的组件 | 页面路由路径 | 需要引用的公共模块或组件 |
|---------|---------------|-----------|----------------|-------------|------------------------|
| 首页/车辆列表 | home.html | 展示车辆列表、搜索筛选、快捷操作入口、底部导航 | 车辆卡片、搜索框、筛选器、快捷按钮、底部TabBar | /home | 公共头部状态栏、底部TabBar、FontAwesome图标 |
| 车辆详情 | vehicle-detail.html | 展示车辆详细信息、拍摄进度、素材概览、成片列表、快捷操作 | 车辆信息展示、进度条、素材概览卡片、成片列表卡片 | /vehicle/:id | 公共头部状态栏、导航栏、FontAwesome图标 |
| 新增/编辑车辆 | vehicle-edit.html | 添加或编辑车辆信息、上传车辆照片 | 表单输入组件、图片上传、下拉选择、文本域 | /vehicle/edit | 公共头部状态栏、导航栏、FontAwesome图标 |
| 标准化拍摄引导 | shoot-guide.html | 引导用户按标准流程拍摄车辆视频、展示拍摄进度 | 摄像头预览、进度条、拍摄步骤列表、录制按钮 | /shoot/guide | 公共头部状态栏、导航栏、FontAwesome图标 |
| 素材管理与时间线 | media-manage.html | 管理拍摄素材、将素材加入时间线、预览时间线 | 素材卡片列表、时间线预览、筛选排序控件 | /media/manage | 公共头部状态栏、导航栏、FontAwesome图标 |
| 自动剪辑与成片预览 | edit-preview.html | 预览自动生成的成片、选择剪辑模板、设置AI选项、编辑文案 | 视频预览播放器、模板选择器、开关控件、文本域 | /edit/preview | 公共头部状态栏、导航栏、FontAwesome图标 |
| 平台分发与发布记录 | publish.html | 选择发布平台、编辑发布文案、查看发布记录 | 平台选择列表、文案编辑器、发布记录列表 | /publish | 公共头部状态栏、导航栏、FontAwesome图标 |
| 导入素材 | import-media.html | 从不同来源导入素材、按车辆归类、设置分组规则 | 导入源选择、车辆选择器、素材预览列表 | /import/media | 公共头部状态栏、导航栏、FontAwesome图标 |
| 一键成片(批量生成) | batch-generate.html | 批量为多辆车生成视频、设置批量策略和模板 | 车辆队列列表、模板选择器、设置开关、策略配置 | /batch/generate | 公共头部状态栏、导航栏、FontAwesome图标 |
| 车辆选择器 | vehicle-selector.html | 选择车辆用于批量操作、搜索筛选车辆 | 车辆选择列表、搜索框、筛选器 | /vehicle/selector | 公共头部状态栏、导航栏、FontAwesome图标 |
| 我的/设置 | profile.html | 用户信息展示、数据统计、系统设置入口 | 用户信息面板、数据统计卡片、设置项列表 | /profile | 公共头部状态栏、底部TabBar、FontAwesome图标 |
| 登录 | login.html | 用户登录或注册、选择身份角色 | 微信登录按钮、手机号登录表单、验证码输入、身份选择器 | /login | 公共头部状态栏、FontAwesome图标 |
| 拍摄首页 | shoot-home.html | 展示待拍摄车辆列表、继续拍摄提醒、快速开始拍摄 | 搜索框、车辆列表、状态提示条、底部TabBar | /shoot/home | 公共头部状态栏、底部TabBar、FontAwesome图标 |
| 成片中心 | clips.html | 展示所有生成的成片、按状态筛选、平台发布情况 | 成片卡片列表、搜索框、筛选器、状态标签、底部TabBar | /clips | 公共头部状态栏、底部TabBar、FontAwesome图标 |
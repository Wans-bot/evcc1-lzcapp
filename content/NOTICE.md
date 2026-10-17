# evcc · 许可与来源说明

本应用是对上游开源项目 **evcc** 的懒猫微服移植打包，未修改上游程序代码。

- 上游项目：https://github.com/evcc-io/evcc
- 打包版本：v0.316.2（容器镜像 tag `0.316.2`，经懒猫镜像中转后使用）
- 版权：Copyright (c) evcc.io (andig, naltatis, premultiply)
- 许可证：MIT License（全文见下）

## 关于上游的附加条款（来自上游 LICENSES/exclusions.md）

上游仓库中部分组件不在 MIT 许可范围内，需要 evcc sponsor token 才能启用：

> Sponsor-required components are NOT covered by the MIT License.
> one evcc sponsorship token is required per evcc instance.

本应用未内置、未修改也未规避这些组件：需要 sponsor token 的厂商集成（如部分车辆/充电桩云 API）
在用户自行填写 sponsor token 之前保持不可用，与上游行为一致。

## 本移植包做的改动

- 仅提供懒猫微服运行所需的打包清单（`package.yml`、`lzc-manifest.yml`、`lzc-build.yml`），
  不修改上游镜像内容。
- 使用环境变量方式设置数据目录（`EVCC_DATABASE_DSN=/data/evcc.db`，映射到持久化目录
  `/lzcapp/var/data`）与电价货币默认值（`EVCC_TARIFFS_CURRENCY=CNY`），遥测保持关闭
  （`EVCC_TELEMETRY=false`）。
- 图标取自上游仓库 `assets/public/meta/android-chrome-512x512.png`（512×512，转为 RGBA PNG）。

## MIT License

Copyright (c) evcc.io (andig, naltatis, premultiply)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

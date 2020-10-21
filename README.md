WeHelp采用可共享的分布式账本记录善行，避免数据被伪造，保证数据的公信力，让链上的数据成为政府发放奖励的依据，**通过区块链解决从民间善行到政府认证的信任问题**。

为众人抱薪者，不可使其冻毙于风雪，我们希望WeHelp不仅仅是一个APP产品，更是一种科技扬善的精神。



项目代码Github：https://github.com/DarionRichie/wehelp-app（持续迭代中）



# 目录说明

BackEnd：后端代码，是与区块链的连接和个推使用


FrontEnd：uniapp的前端代码等

SmartContract：是智能合约目录



# WeID架构

- **背景**

求救者、救助者、社会组织认证、奖励提供方等。善行积分设计各个环节的都需要进行身份认证，确保救助过程、发证过程、验证过程的真实有效性，以此鼓励真善行。

- **参与方（发证身份认证手段）**

- - 救助者

  - - 衡量贡献（最佳救助人由求救者，协助者，社会组织共同推选）

  - 求救者

  - 奖励提供方（义工联、政府社区、小学等）

  - 社会组织认证（医院、公安机构、救助者群体）

  - - 大型救助由公安、医院发证。这是目典型案例、演讲稿中涉及的
    - 小型救助由救助者群体联合发证。50认为可以发证就发。这是典型案例、讲演稿未涉及的，作为展望规划内容。待讨论

- **流程**

1. 4类角色分别进行did，kyc。

2. 参与救援的救助者向对应的公安、医院申请商行凭证。

3. 1. 发证方根据，救助者群体，求救者群体，以及自身的专业考量对救助者群体的贡献度进行衡量，评分，发证，发积分。

4. 用户查看自己的主页凭证、积分

5. 奖励方向对应的证书颁发者进行证书验证

6. 验证通过，用户通过消耗积分，获取奖励。



# 快速开始

怎么运行，要写1下。



# 代码贡献

- 我们非常欢迎您本项目创意、代码的贡献
- 如果这个项目您觉的还不错，不妨点个赞呀
- 也可以联系 `Keep Water` 团队参与后续迭代



# License

[![img](https://camo.githubusercontent.com/79110cc851844b4439d1589c0387daabfca8615c/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f464953434f2d42434f532f464953434f2d42434f532e737667)](https://github.com/FISCO-BCOS/FISCO-BCOS/blob/master/LICENSE)

All contributions are made under the [GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.en.html). See [LICENSE](https://github.com/FISCO-BCOS/FISCO-BCOS/blob/master/LICENSE).
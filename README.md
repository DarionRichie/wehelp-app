WeHelp采用可共享的分布式账本记录善行，避免数据被伪造，保证数据的公信力，让链上的数据成为政府发放奖励的依据，**通过区块链解决从民间善行到政府认证的信任问题**。

为众人抱薪者，不可使其冻毙于风雪，我们希望WeHelp不仅仅是一个APP产品，更是一种科技扬善的精神。



项目代码Github：https://github.com/DarionRichie/wehelp-app（持续迭代中）



# 目录说明

BackEnd：后端代码，是与区块链的连接和个推使用


FrontEnd：uniapp的前端代码等

SmartContract：是智能合约目录



## 系统使用流程

<img src=".\Pic\process.png" alt="process" style="zoom:80%;" />

# WeID架构

## 流程图

<img src=".\Pic\weid_process.png" alt="weid_process" style="zoom:80%;" />

## 使用说明

- **背景**

求救者、救助者、有关机构、奖励方等涉及多方机构，善行凭证的发放涉及各方的都需要进行有效的身份认证，确保救助过程、发证过程、验证过程的真实有效性，并且让链上的数据成为政府发放奖励的依据，**通过区块链解决从民间善行到政府认证的信任问题。**

- **参与方**

- - 求救者

  - 救助者

  - 有关机构（医院、公安机构等）

  - - 大型求救由公安、医院等权威凭证发行者发行善行凭证。目前凭证记录的内容有发证机构WeID、求救者WeID、救助者WeID、发证时间、积分。

  - 奖励方（义工联、人社局、政府、社区、学校等）

- **流程**

1. 求救者、救助者、有关机构认证、奖励方等分别进行WeIdentity DID 注册及KYC认证。

2. 参与救援的救助者向对应的医院或公安等有关机构申请善行凭证。

3. 1. 发证方根据，救助者群体，求救者群体，以及自身的专业考量对救助者群体的贡献度进行衡量，发放对应积分的凭证。

4. 用户可以在自己的主页查看每个善行凭证以及对应的积分。

5. 奖励方通过核验用户的凭证，核验善行凭证和积分的真实有效性，并提供对应的建立。

6. 用户的凭证验证通过，用户通过消耗积分，获取对应的奖励。

## 凭证CPT设计

<img src=".\Pic\cpt.png" alt="cpt" style="zoom:80%;" />

# 快速开始

怎么运行，要写1下。



# 代码贡献

- 我们非常欢迎您本项目创意、代码的贡献
- 如果这个项目您觉的还不错，不妨点个赞呀
- 也可以联系 `Keep Water` 团队参与后续迭代



# License

[![img](https://camo.githubusercontent.com/79110cc851844b4439d1589c0387daabfca8615c/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f464953434f2d42434f532f464953434f2d42434f532e737667)](https://github.com/FISCO-BCOS/FISCO-BCOS/blob/master/LICENSE)

All contributions are made under the [GNU General Public License v3](https://www.gnu.org/licenses/gpl-3.0.en.html). See [LICENSE](https://github.com/FISCO-BCOS/FISCO-BCOS/blob/master/LICENSE).
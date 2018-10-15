import ConfigManager from "../Managers/ConfigManager";
import KeyboardReturnType = cc.EditBox.KeyboardReturnType;

const {ccclass, property} = cc._decorator;

@ccclass
export default class UITable extends cc.Component {


    CurTurnNum:number = 1;//当前回合数

    CurTurnTimer:number =10;//当前回合倒计时

    PublicPlate = [];//公共盘子

    // onLoad () {}

    @property(cc.Label)
    m_timerLabel:cc.Label = null;

    @property(cc.Label)
    m_turnLabel:cc.Label = null;

    m_curFoodList =[];//当前刷新的食物列表

    @property(cc.Prefab)
    m_cloneUIFood:cc.Prefab =null;
    @property(cc.Node)
    m_FoodParent:cc.Node=null;

    @property(cc.SpriteAtlas)
    m_foodAtlas:cc.SpriteAtlas = null;

    start () {

        this.UpdateFoods();
    }

    // update (dt) {}

    UpdateUI()
    {

    }

    private UpdatePlayer1Tasks()
    {
            this.node.getComponentsInChildren("cc.Sprite");
    }

    private UpdatePlayer2Tasks()
    {

    }

    private UpdateFoods()
    {
        this.ClearFoods();

        let allTasks = ConfigManager.Instance().m_configTask;
        let taskList = [];
        for (let k in allTasks)
        {
            taskList.push(allTasks[k].ItemID);
        }
        let list = this.RandomuNnique(0,taskList.length,6)
        for (let i = 0;i<list.length;i++)
        {
            console.log(taskList[list[i]]);
            let item =ConfigManager.Instance().GetItemByID(taskList[list[i]]);
            if(item!=null)
            {
                let newNode = cc.instantiate(this.m_cloneUIFood) as cc.Node;
                let icon:cc.Sprite =newNode.getComponentInChildren("cc.Sprite");
                if(icon!=null)icon.spriteFrame = this.m_foodAtlas.getSpriteFrame(item.Icon);
                newNode.active = true;
                newNode.parent = this.m_FoodParent;
                newNode.setPosition(this.GetPosByIndex(i));
            }else {
                console.error("Item is null!")
            }
        }
    }

    private GetPosByIndex(index:number):cc.Vec2
    {
        let pos:cc.Vec2 = cc.Vec2.ZERO;
        switch (index)
        {
            case 0:
                pos = new cc.Vec2(0,260);
                break;
            case 1:
                pos = new cc.Vec2(240,186);
                break;
            case 2:
                pos = new cc.Vec2(218,-181);
                break;
            case 3:
                pos = new cc.Vec2(0,-260);
                break;
            case 4:
                pos = new cc.Vec2(-218,-186);
                break;
            case 5:
                pos = new cc.Vec2(-232,169);
                break;
            default:
                break;
        }
        return pos;
    }

    private ClearFoods()
    {
        if(this.m_curFoodList.length>0)
        {
            for(let i= this.m_curFoodList.length-1;i>=0;i--)
            {
                let item = this.m_curFoodList.length-1;
                item.destroy();
                this.m_curFoodList.splice(i,1);
            }
        }
    }

    RandomuNnique(start,end,size):number[]
    {
        let allNums:number[] = [];
        size = size ?(size>end - start ?end - start :size):1;
        for (let i =start,k=0;i <= end; i++,k++)
        {
            allNums[k] =i;
        }
        allNums.sort(function (){return 0.5 - Math.random();}) ;

        return allNums.slice(0,size);
    }
}

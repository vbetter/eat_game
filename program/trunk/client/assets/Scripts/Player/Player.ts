import ccclass = cc._decorator.ccclass;
import property = cc._decorator.property;
import ConfigManager from "../Managers/ConfigManager";
import Utils from "../Common/Utils";

@ccclass()
export default class Actor extends cc.Component {

    Score:number =0;        //分数
    HasFoodsIDList =[];      //已获得的食物id列表
    TaskFoodsIDList =[];     //目标食物id列表

    @property({type:[cc.Sprite]})
    m_tasks:cc.Sprite[] =[];
    @property(cc.SpriteAtlas)
    m_foodAtlas:cc.SpriteAtlas = null;

    start()
    {
        this.Init();
    }

    Init()
    {
        let allTasks = ConfigManager.Instance().m_configTask;
        let taskList = [];
        for (let k in allTasks)
        {
            taskList.push(allTasks[k].ItemID);
        }
        let list = Utils.RandomuNnique(0,taskList.length-1,5)
        for (let i = 0;i<list.length;i++)
        {
            console.log(taskList[list[i]]);
            let item =ConfigManager.Instance().GetItemByID(taskList[list[i]]);
            if(item!=null)
            {
                let icon = this.m_tasks[i];
                icon.spriteFrame = this.m_foodAtlas.getSpriteFrame(item.Icon);
            }else {
                console.error("Item is null!")
            }
        }
    }
}
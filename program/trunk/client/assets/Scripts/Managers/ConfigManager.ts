
import m_Config = require('../../Configs/Config.js');

export default class ConfigManager {

    private static instance: ConfigManager = null;

    static Instance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
            ConfigManager.instance.Init();
        }
        return ConfigManager.instance;
    }

    m_configItems  = null;
    m_configActor = null;
    m_configTask = null;
    m_configSet = null;

    Init()
    {
        this.m_configItems = m_Config["Item"];
        this.m_configActor = m_Config["Actor"];
        this.m_configTask = m_Config["Task"];
        this.m_configSet = m_Config["Set"];
    }

    GetItemByID(id:string)
    {
        if(this.m_configItems)
        {
            return this.m_configItems[id];
        }
        return null;
    }

    GetActorByID(id:string)
    {
        if(this.m_configActor)
        {
            return this.m_configActor[id];
        }
        return null;
    }

    GetTaskByID(id:string)
    {
        if(this.m_configTask)
        {
            return this.m_configTask[id];
        }
        return null;
    }

    GetSetByID(id:string)
    {
        if(this.m_configSet)
        {
            return this.m_configSet[id];
        }
        return null;
    }
}
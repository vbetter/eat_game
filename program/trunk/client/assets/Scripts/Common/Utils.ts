const {ccclass, property} = cc._decorator;

@ccclass
export default class Utils
{


    static RandomuNnique(start,end,size):number[]
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

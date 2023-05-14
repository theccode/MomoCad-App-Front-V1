export const handleCase = (string) => {
    let n=string.split(".");
    let vfinal=""
    for(let i=0;i<n.length;i++)
    {
    let  spaceput=""
    let  spaceCount=n[i].replace(/^(\s*).*$/,"$1").length;
    n[i]=n[i].replace(/^\s+/,"");
    let newstring=n[i].charAt(n[i]).toUpperCase() + n[i].slice(1);
    for(let j=0;j<spaceCount;j++)
    spaceput=spaceput+" ";
    vfinal=vfinal+spaceput+newstring+".";
    }
    vfinal=vfinal.substring(0, vfinal.length - 1);
    return vfinal;
}
module.exports = {
    capitalize(s){
        return s.charAt(0).toUpperCase() + s.slice(1)
    },
    reduceDuplicate(arr){
        let tabsArr = [];
        arr.map((p) => { if (!tabsArr.includes(this.capitalize(p.category))) { tabsArr.push(this.capitalize(p.category)) } })
        return tabsArr;
    },
    reduceDuplicateByUsername(arr){
        let tabsArr = [];
        arr.map((p) => { if (!tabsArr.includes(this.capitalize(p.username))) { tabsArr.push(this.capitalize(p.username)) } })
        return tabsArr;
    }
}
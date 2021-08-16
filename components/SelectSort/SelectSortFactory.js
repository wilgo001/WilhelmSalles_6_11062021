class SelectSortFactory {

    static getInstance(parent, photoList) {
        let select = new SelectSort(parent);
        select.photoList = photoList;
        select.start();
        return select;
    }
}
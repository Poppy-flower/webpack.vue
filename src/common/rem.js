/**
 * Created by mahenan on 2017/11/8.
 */
(function () {
    var designWidth = window.designWidth;
    window.designWidth = undefined;

    function setRootSize(width) {
        width = width || designWidth || 375;

        var clientWidth = document.documentElement.clientWidth;
        if (clientWidth > 640) {
            clientWidth = 640
        } else {
            if (clientWidth < 320) {
                clientWidth = 320
            }
        }

        var fz=(clientWidth / width) * 100;
        document.documentElement.style.fontSize = (clientWidth / width) * 100 + "px";

        var realfz = ~~(+window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px','')*10000)/10000;
        if (fz !== realfz) {
            document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz * (fz / realfz) +"px";
        }


    }

    setRootSize();

    window.addEventListener("resize", function () {
        setRootSize();
    }, false);
})();


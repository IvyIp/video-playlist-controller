class videoPlaylist {
    constructor(element, playList, config) {
        this.playList = [];
        this.index = 0;
        this.isPlaying = false;
        this.video = null;
        this.source = null;
        this.ended = false;
        this.repeatCount = 0;
        this.wrapper = null;

        let configDefault = {
            autoplay: true,
            loop: true,
            randomList: false
        };
        this.config = Object.assign({}, configDefault, config);
        let video = document.createElement('video');
        this.wrapper = element;
        this.video = this.wrapper.appendChild(video);

        if (this.config.randomList === true){
            this.playList = this.randomize(playList);
        }else{
            this.playList = playList;
        }

        this.source = document.createElement('source');
        this.source.setAttribute('src', this.playList[0]);
        this.video.appendChild(this.source);

        if (this.config.autoplay  === true) {
            this.play();
        }else{
            this.pause();
        }
        this.video.onended = () => {
            this.updateIndexByNext();
            if (this.ended === false) {
                this.video.load();
                this.play();
            }else{
                this.pause();
            }
        };
    }
    play(){
        this.isPlaying = true;
        this.source.setAttribute('src', this.playList[this.index]);
        this.video.play();
    }
    pause(){
        this.isPlaying = false;
        this.video.pause();
    }
    updateIndexByNext(){
        if ((this.index + 1) >= this.playList.length){
            if (this.config.randomList === true) {
                this.playList = this.randomize(this.playList);
            }
            this.index = 0;
            if (this.config.loop === false){
                this.ended = true;
                this.wrapper.dispatchEvent(new CustomEvent('playListEnded'));
            }
            this.repeatCount++;
        }else{
            this.index++;
        }
        if (this.ended === false) {
            this.wrapper.dispatchEvent(new CustomEvent('videoChanged', {detail: this.getCurrentVideo()}));
        }
    }

    static randomize(array) {
        /** This function is contributed by Blender in https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array **/
        let counter = array.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    getCurrentVideo(){
        return {index: this.index, video: this.playList[this.index]}
    }

    getRepeatCount(){
        return this.repeatCount;
    }

    getIsPlaying(){
        return this.isPlaying;
    }

}
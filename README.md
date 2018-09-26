# js-video-playlist-controller
A javascript video playlist contorller.
This handle the play states of video in the play list.
## Demo
https://ivyip.github.io/videoPlayListController/

## Getting Started

Just include the libray.
```
<script src="/path/to/js-video-playlist-controller.js"></script>
```
Initialize the class as followed:
```
new videoPlaylist(<wrapper>, <List of Video>, <Options>);
```
Example
```
<div id="video-wrapper"></div>
...
<script>
let wrapper = document.getElementById("video-wrapper");
let PlayListController =
new videoPlaylist(wrapper, ["1.mp4", "2.mp4", "3.mp4"], {autoplay: false, loop:true});
</script>
```
## Options
You can try to override some default value by setting the options.

| Option | Description | Default |
| --- | --- | --- |
| autoplay | Autoplay the video when the class is initialized | true |
| loop | Whether the playlist will start to play again when the list finished | true |
| randomList | Shuffle the playlist when the class is initialized or when the list is came to end | false |

## Methods
Some methods are provided for checking the status of the video.
They can be called by PlayListController.<method>.

| Method | Description | Return Example |
| --- | --- | --- |
| getIsPlaying() | Get the play State. | false |
| getCurrentVideo() | Get the current video's information. | {index: 0, video: "video.mp4"} |
| getRepeatCount() | Number of time the list has repeated | 2 |
| play() | Continue to play| NONE |
| pause() | Pause the video| NONE |

## Events
Events are emitted when certain criteria are met.
They dispatched by the video wrapper.
Event can be caught in this way by pure javascript:
```
wrapper.addEventListener('videoChanged', function (e) {
    console.log(`Currnet video: index ${e.detail.index} , path: ${e.detail.video}`);
});
```
| Event | Description | Data |
| --- | --- | --- |
| videoChanged | The event is triggered when the video is ended and the next video is about to play. | {e: { detail: { index: <index>, video: <video>} } } |
| playListEnded | The event is triggered when the play list has came to the end. | - |

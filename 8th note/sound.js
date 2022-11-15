var sound = function(game){
  this.game = game;
  this.context = null;
  this.volume = 0;

  var self = this;

  this.init = function(){
    this.getMicrophoneAccess();
  }

  this.onStream = function(stream){
    // Context là luồng dữ liệu audio browser thu được
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    // Tạo stream audio từ context
    var audioStream = this.context.createMediaStreamSource(stream);
    // Tạo analyser cho audio
    var analyser = this.context.createAnalyser();
    audioStream.connect(analyser);
    // Set data audio nhận vào là 1 luồng 512 byte
    analyser.fftSize = 512;
    var dataArray = new Uint8Array(analyser.frequencyBinCount);

    setInterval( () => {
      analyser.getByteFrequencyData(dataArray);
      var sum = 0;
      for (let i = 0; i< 256; i++){
        sum += dataArray[i];
      }
      self.volume = sum / 256;
    }, 20);
  }
  // Hỏi ý kiến quyền truy cập audio từ browser
  this.getMicrophoneAccess = function(){
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then(this.onStream);
  }
}
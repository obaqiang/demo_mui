//计算图片md5
function img_MD5(img_path, callback) {
	plus.io.resolveLocalFileSystemURL(img_path, function(entry) {
		var fileReader = new plus.io.FileReader();
		fileReader.readAsDataURL(entry);
		fileReader.onloadend = function(evt) {
			var format = "image/jpeg";
			//抽取DataURL中的数据部分，从Base64格式转换为二进制格式
			var bin = atob(evt.target.result.split(',')[1]);
			//创建空的Uint8Array
			var buffer = new Uint8Array(bin.length);
			//将图像数据逐字节放入Uint8Array中
			for(var i = 0; i < bin.length; i++) {
				buffer[i] = bin.charCodeAt(i);
			};
			//利用Uint8Array创建Blob对象
			blob = new Blob([buffer.buffer], {
				type: format
			});
			var fileReader1 = new FileReader();
			fileReader1.readAsBinaryString(blob);
			fileReader1.onload = function(evt) {
				if(evt.target.readyState == FileReader.DONE) {
					var imgblob = evt.target.result;
					var sparkMD5 = new SparkMD5();
					sparkMD5.appendBinary(imgblob);
					var MD5 = sparkMD5.end();
					console.log("MD5:" + MD5);
					callback(MD5)
				}
			};
		}
	}, function(e) {
		console.log("Resolve file URL failed: " + e.message);
	});
}
//使用方法
var url = document.getElementById("ID").src;
img_MD5(url, function(md5) {
	console.log(md5)
})
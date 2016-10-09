var Config = require('../../config');
var AWS = require('aws-sdk');
var Promise = require('bluebird');

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION
});

var s3Client = new AWS.S3({
	params: {
		Bucket: process.env.AWS_S3_BUCKET
	}
});

function S3Service() {

}

/**
 * Generates an signed URL for a given file
 * @param {String} path - The path to the file
 * @param {Number} [expiresIn=60] - Seconds until the url expires
 * @returns {bluebird} - A Promise which gets resolved with a signed URL
 */
S3Service.prototype.getUrl = function(path, expiresIn) {
	if (!expiresIn) {
		expiresIn = 60;
	}
	return new Promise(function (resolve, reject) {
		s3Client.getSignedUrl('getObject', {
			Key: path,
			Expires: expiresIn
		}, function (err, url) {
			if (err) {
				reject(err);
			} else {
				resolve(url);
			}
		});
	});
};

/**
 * Upload a file stream to S3
 * @param {String} path - The destination path of the file
 * @param {ReadStream} stream - A read stream
 * @param {String} contentType - The content type of the file
 * @param {String} [filename] - An optional filename
 * @returns {Promise} - A Promise which gets resolved with a saved file
 */
S3Service.prototype.uploadStream = function(path, stream, contentType, filename) {
	var contentDisposition = 'inline;';
	if (filename) {
		contentDisposition += ' filename=' + filename;
	}
	//noinspection JSValidateTypes
	return new Promise(function(resolve, reject) {
		s3Client.upload({
			Key: path,
			Body: stream,
			ContentDisposition: contentDisposition,
			ContentType: contentType
		}, function(err){
			if (err) {
				reject(err);
			} else {
				resolve(path);
			}
		});
	});
};

S3Service.prototype.downloadFile = function (file) {
	var self = this;
	return new Promise(function (resolve, reject) {
		var stream = require('fs').createWriteStream(self.getPath(file, true));
		s3Client.getObject({
			Key: self.getPath(file)
		}, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		}).createReadStream().pipe(stream);
	});
};

S3Service.prototype.getRemoteFileList = function (path) {
	return new Promise(function (resolve, reject) {
		s3Client.listObjects({
			Prefix: path
		}, function(err, data) {
			if (err) {
				reject(err);
			} else {
				var content = data.Contents;
				var files = [];
				for (var i = 0; i < content.length; i++) {
					files.push(content[i].Key);
				}
				resolve(files);
			}
		});
	});
};


module.exports = new S3Service();
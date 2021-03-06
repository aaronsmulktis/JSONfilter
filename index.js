var express = require('express'),
	app = express(),

	request = require('superagent'),
	cloudinary = require('cloudinary'),
	json2csv = require('nice-json2csv'),

	port = process.env.PORT || 5000,

	maxResults = '33',

	GaloreTV1 = 'PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b',
	GaloreTV2 = 'PLPp3tIzLUEwYySnVu0xLsKr13quhabBGr',
	GaloreTV3 = 'PLPp3tIzLUEwbkwSfDML6R12DCI5XwG6LH',
	GaloreTV4 = 'PLPp3tIzLUEwaWgJtRGfkzkSot2ELUCR-l',
	GaloreTV5 = 'PLPp3tIzLUEwbukcmLprg-s4qOdw9mCEPD',

	// listVintage = 'PLx0X0-cKhSOAqvmUTwsHVTYGLuQjhQcnF',
	listExclusives = 'PLx0X0-cKhSOBXGK3Yr11j1HLa_ccrNO2G',
	listOriginals = 'PLx0X0-cKhSOAwWv_GDzenSU3y4WmJn680',
	listFeatured = 'PLx0X0-cKhSOBYY6KXhQZg4dmK5pyGQk-o',
	listEtc = 'PLx0X0-cKhSOAuD8lqX9DGewYhdRehcqJ4',
	listLiveFrom = 'PLx0X0-cKhSOChWAkkEvSDv1nWfdIzXr9M',
	listBombshellOnStreet = 'PLx0X0-cKhSOC1xblQxSnkTW1BNVmoLUzX',
	listUncovered = 'PLx0X0-cKhSOA7Iz8dGPW7Y5s6o2UKuEyX',
	// listAskPush = 'PLx0X0-cKhSOAgUD3PjNTnEh4Unqgz1MxL',
	listModel20 = 'PLx0X0-cKhSOAnlBpACK4BF2zR1MAZ4vLY',
	listTeachMe = 'PLx0X0-cKhSOCCIGzz4vEy-KVhJ5JYuTFQ',
	listGirls = 'PLx0X0-cKhSOCDflvS223SK4XELsHhuCCg',
	listBeautyConfessional = "PLx0X0-cKhSOAgUD3PjNTnEh4Unqgz1MxL",
	// listInBed = 'PLx0X0-cKhSOAr0sep7jVg4Yya7IU-Q-zv',
	// listBombshells = 'PLx0X0-cKhSOAmazTrHEZHSSc3RLQC6tQT',
	// listSpecials = 'PLx0X0-cKhSOBXGK3Yr11j1HLa_ccrNO2G',

	accessToken = '1/Dt5cBhLxKG_EjyWZxYEJ7oADupiaJmrl_G_846BZ1mZIgOrJDtdun6zK6XiATCKT',
	apiKey = 'AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s',
	chanID = 'UCyzzsgpNlmLBKYcXLM3Ro3g',

	featured = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listFeatured+'&key='+apiKey,
	shows = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId='+chanID+'&key='+apiKey+'&maxResults='+maxResults,
	theLatest = 'https://www.googleapis.com/youtube/v3/search?key='+apiKey+'&channelId='+chanID+'&part=snippet&order=date&maxResults='+maxResults,
	// mostPopular = 'https://www.googleapis.com/youtube/v3/search?key='+apiKey+'&channelId='+chanID+'&part=snippet&order=viewCount&maxResults='+maxResults,

// Get Playlists by Channel Id
// https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCyzzsgpNlmLBKYcXLM3Ro3g&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s&maxResults=33

// GaloreTV 1
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=33&playlistId=PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 2
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=33&playlistId=PLPp3tIzLUEwYySnVu0xLsKr13quhabBGr&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 3
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=33&playlistId=PLPp3tIzLUEwbkwSfDML6R12DCI5XwG6LH&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 4
	vintage = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+GaloreTV5+'&key='+apiKey,
// Galore TV 5
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=33&playlistId=PLPp3tIzLUEwbukcmLprg-s4qOdw9mCEPD&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';

	all = 'https://www.googleapis.com/youtube/v3/search?key='+apiKey+'&channelId='+chanID+'&part=snippet,id&order=date&maxResults=33',

	exclusives = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listExclusives+'&key='+apiKey,
	originals = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listOriginals+'&key='+apiKey,
	etc = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listEtc+'&key='+apiKey,

	uncovered = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listUncovered+'&key='+apiKey,
	liveFrom = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listLiveFrom+'&key='+apiKey,
	// askPush = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listAskPush+'&key='+apiKey,
	model20 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listModel20+'&key='+apiKey,
	teachMe = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listTeachMe+'&key='+apiKey,
	girls = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listGirls+'&key='+apiKey,
	// inBed = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listInBed+'&key='+apiKey,
	bombshellOnStreet = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listBombshellOnStreet+'&key='+apiKey,
	beautyConfessional = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listBeautyConfessional+'&key='+apiKey;
	// specials = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listSpecials+'&key='+apiKey;

cloudinary.config({
  cloud_name: 'galore',
  api_key: '789423776114718',
  api_secret: 'BXCCmMwEuhohSFCpz7QL-gUV3oY'
});

function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') {line += ','};

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
};

// function process(arr) {
// 	return arr.map(function(items) {
// 		function escapeRegExp(str) {
// 		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
// 		}
// 		function replaceAll(str, find, replace) {
// 		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
// 		}
//
// 		return {
// 			url: items.id.videoId,
// 			// _id: items.id.videoId,
// 			title: replaceAll(items.snippet.title, " | Galore TV", ""),
// 			desc: items.snippet.description,
// 			date: items.snippet.publishedAt,
// 			thumb: items.snippet.thumbnails.medium.url,
// 			thumbLg: 'https://i.ytimg.com/vi/' + items.snippet.resourceId.videoId + '/maxresdefault.jpg'
// 		}
// 	});
// };
//
// function processLatest(arr) {
// 	return arr.map(function(items) {
// 		function escapeRegExp(str) {
// 		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
// 		}
// 		function replaceAll(str, find, replace) {
// 		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
// 		}
//
// 		return {
// 			url: items.id,
// 			// _id: items.id,
// 			title: replaceAll(items.snippet.title, " | Galore TV", ""),
// 			desc: items.snippet.description,
// 			date: items.snippet.publishedAt,
// 			thumb: items.snippet.thumbnails.medium.url,
// 			thumbLg: 'https://i.ytimg.com/vi/' + items.snippet.resourceId.videoId + '/maxresdefault.jpg',
// 			views: items.statistics.viewCount,
// 			likes: items.statistics.likeCount,
// 			tags: items.snippet.tags
// 		}
// 	});
// };
//
// function processIds(arr) {
// 	return arr.map(function(items) {
// 		return {
// 			url: items.id.videoId,
// 		}
// 	});
// };

function processShow(arr) {
	return arr.map(function(items) {

		function makeSlug(title) {
		    var str = title;
		        str = str.replace(/[^a-zA-Z0-9\s]/g,"");
		        str = str.toLowerCase();
		        str = str.replace(/\s/g,'-');
		        str = str.replace(/^-+|-+$|(-)+/g, '$1');
		        return str;
		}

		function escapeRegExp(str) {
		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		return {
			url: items.id,
			// _id: items.id,
			title: replaceAll(items.snippet.title, " | Galore TV", ""),
			desc: items.snippet.description,
			date: items.snippet.publishedAt,
			thumb: cloudinary.url("tv/shows/posters/"+makeSlug(items.snippet.title)+".jpg", {dpr: 2.0, secure: true, width: 320, height: 180, crop: 'fill', flags: ["lossy", "progressive"], quality: 70, fetch_format: "auto"}),
			thumbLg: cloudinary.url("tv/shows/posters/"+makeSlug(items.snippet.title)+".jpg", {dpr: 2.0, secure: true, width: 1280, height: 720, crop: 'fill', flags: ["lossy", "progressive"], quality: 70, fetch_format: "auto"})
		}
	});
};

// function processList(arr) {
//
// 	return arr.map(function(items) {
//
// 		function hiRes(img) {
// 			if ("maxres" in img) {
// 				return items.snippet.thumbnails.maxres.url;
// 			} else if ("standard" in img) {
// 				return items.snippet.thumbnails.standard.url;
// 			} else if ("high" in img) {
// 				return items.snippet.thumbnails.high.url;
// 			} else if ("medium" in img) {
// 				return items.snippet.thumbnails.medium.url;
// 			} else if ("default" in img) {
// 				return items.snippet.thumbnails.default.url;
// 			} else {
// 				hiRes(img);
// 			}
// 		}
//
// 		function escapeRegExp(str) {
// 		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
// 		}
// 		function replaceAll(str, find, replace) {
// 		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
// 		}
//
// 		return {
// 			url: items.snippet.resourceId.videoId,
// 			// _id: items.snippet.resourceId.videoId,
// 			title: replaceAll(items.snippet.title, " | Galore TV", ""),
// 			desc: items.snippet.description,
// 			date: items.snippet.publishedAt,
// 			listId: items.snippet.playlistId,
// 			thumb: hiRes(items.snippet.thumbnails),
// 			thumbLg: 'https://i.ytimg.com/vi/' + items.snippet.resourceId.videoId + '/maxresdefault.jpg'
// 		}
// 	});
// };

function processFeatured(arr) {

	return arr.map(function(items) {

		function hiRes(img) {
			if (('maxres' in img) == true) {
				return items.snippet.thumbnails.maxres.url;
			} else {
				return items.snippet.thumbnails.high.url;
			}
		}

		function escapeRegExp(str) {
		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		return {
			url: items.snippet.resourceId.videoId,
			title: replaceAll(items.snippet.title, " | Galore TV", ""),
			// _id: items.snippet.resourceId.videoId,
			featured: true,
			hero: hiRes(items.snippet.thumbnails)
			// hero: items.snippet.thumbnails.high.url
		}
	});
};

// function processSpecials(arr) {
//
// 	return arr.map(function(items) {
//
// 		function escapeRegExp(str) {
// 		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
// 		}
// 		function replaceAll(str, find, replace) {
// 		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
// 		}
//
// 		return {
// 			url: items.snippet.resourceId.videoId,
// 			// _id: items.snippet.resourceId.videoId,
// 			title: replaceAll(items.snippet.title, " | Galore TV", ""),
// 			desc: items.snippet.description,
// 			date: items.snippet.publishedAt,
// 			special: true,
// 			listId: items.snippet.playlistId,
// 			thumb: 'https://i.ytimg.com/vi/' + items.snippet.resourceId.videoId + '/mqdefault.jpg',
// 			thumbLg: 'https://i.ytimg.com/vi/' + items.snippet.resourceId.videoId + '/maxdefault.jpg'
// 		}
// 	});
// };

function processOther(arr) {
	return arr.map(function(items) {

		function escapeRegExp(str) {
		  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		function replaceAll(str, find, replace) {
		  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
		}

		return {
			url: items.snippet.resourceId.videoId,
			// _id: items.snippet.resourceId.videoId,
			title: replaceAll(items.snippet.title, " | Galore TV", ""),
			desc: items.snippet.description,
			date: items.snippet.publishedAt,
			listId: items.snippet.playlistId,
			thumb: 'http://i.ytimg.com/vi/' + items.snippet.resourceId.videoId + '/mqdefault.jpg',
			thumbLg: 'http://i.ytimg.com/vi/' + items.snippet.resourceId.videoId + '/maxresdefault.jpg'
		}
	});
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/all', function (req, res) {
	request.get(allVids).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var allVids = processShow(response.body.items);
			res.status(200).send(allVids);
		}
	});
});

app.get('/shows', function (req, res) {
	request.get(shows).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var shows = processShow(response.body.items);
			res.status(200).send(shows);
		}
	});
});

// app.get('/theLatestCSV', function (req, res) {
// 	request.get(theLatest).end(function(err,response) {
// 		if (err) {
// 			console.log(err);
// 			res.status(404).send(err);
// 		} else {
// 			var theLatest = processIds(response.body.items);
// 			var str = ConvertToCSV(theLatest);
// 			var ids = str.replace(/\s+/g, ",");
// 			res.status(200).send(ids);
// 		}
// 	});
// });

app.get('/featured', function (req, res) {
	request.get(featured).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var featured = processFeatured(response.body.items);
			res.status(200).send(featured);
		}
	});
});

// app.get('/mostPopular', function (req, res) {
// 	request.get(theLatest).end(function(err,response) {
// 		if (err) {
// 			console.log(err);
// 			res.status(404).send(err);
// 		} else {

// 			// Latest w/ View Count
// 			var theLatest = processIds(response.body.items),
// 				str = ConvertToCSV(theLatest),
// 				ids = str.replace(/\s+/g, ","),
// 				vidQuery = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id='+ids+'&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s',
// 				latestWithViewCount = processLatest(response.body.items);

// 			res.status(200).send(latestWithViewCount);
// 		}
// 	});
// });

app.get('/vintage', function (req, res) {
	request.get(vintage).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var vintage = processOther(response.body.items);
			res.status(200).send(vintage);
		}
	});
});

app.get('/liveFrom', function (req, res) {
	request.get(liveFrom).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var liveFrom = processOther(response.body.items);
			res.status(200).send(liveFrom);
		}
	});
});

// app.get('/askPush', function (req, res) {
// 	request.get(askPush).end(function(err,response) {
// 		if (err) {
// 			console.log(err);
// 			res.status(404).send(err);
// 		} else {
// 			var askPush = processOther(response.body.items);
// 			res.status(200).send(askPush);
// 		}
// 	});
// });

app.get('/model20', function (req, res) {
	request.get(model20).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var model20 = processOther(response.body.items);
			res.status(200).send(model20);
		}
	});
});

app.get('/teachMe', function (req, res) {
	request.get(teachMe).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var teachMe = processOther(response.body.items);
			res.status(200).send(teachMe);
		}
	});
});

app.get('/girls', function (req, res) {
	request.get(girls).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var girls = processOther(response.body.items);
			res.status(200).send(girls);
		}
	});
});

// app.get('/inBed', function (req, res) {
// 	request.get(inBed).end(function(err,response) {
// 		if (err) {
// 			console.log(err);
// 			res.status(404).send(err);
// 		} else {
// 			var inBed = processOther(response.body.items);
// 			res.status(200).send(inBed);
// 		}
// 	});
// });

app.get('/bombshellOneStreet', function (req, res) {
	request.get(bombshellOnStreet).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var bombshellOnStreet = processOther(response.body.items);
			res.status(200).send(bombshellOnStreet);
		}
	});
});

app.get('/originals', function (req, res) {
	request.get(originals).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var originals = processOther(response.body.items);
			res.status(200).send(originals);
		}
	});
});

app.get('/etc', function (req, res) {
	request.get(etc).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var etc = processOther(response.body.items);
			res.status(200).send(etc);
		}
	});
});

app.get('/exclusives', function (req, res) {
	request.get(exclusives).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var exclusives = processOther(response.body.items);
			res.status(200).send(exclusives);
		}
	});
});

app.get('/uncovered', function (req, res) {
	request.get(uncovered).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var uncovered = processOther(response.body.items);
			res.status(200).send(uncovered);
		}
	});
});

app.get('/bombshellOnStreet', function (req, res) {
	request.get(bombshellOnStreet).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var bombshellOnStreet = processOther(response.body.items);
			res.status(200).send(bombshellOnStreet);
		}
	});
});

app.get('/beautyConfessional', function (req, res) {
	request.get(beautyConfessional).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var beautyConfessional = processOther(response.body.items);
			res.status(200).send(beautyConfessional);
		}
	});
});

// app.get('/specials', function (req, res) {
// 	request.get(specials).end(function(err,response) {
// 		if (err) {
// 			console.log(err);
// 			res.status(404).send(err);
// 		} else {
// 			var specials = processSpecials(response.body.items);
// 			res.status(200).send(specials);
// 		}
// 	});
// });

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

// app.listen(port, function() {
// 	console.log("Node app is running at localhost:" + port);
// });

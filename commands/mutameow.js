const Discord = require("discord.js");
const generateRandomColor = require("../extras/generateRandomColor");

const mutameow = (message) => {
  const picLinks = [
    "https://i.ibb.co/LPv5pJ8/0cf7e854592d5bec60700e6154bd6d4b.jpg",
    "https://i.ibb.co/8z99V2b/0decb28cb46692c50bd841d0650539fd.png",
    "https://i.ibb.co/6wvgCkC/1b6873ce682734e89a3da0873260d8df.jpg",
    "https://i.ibb.co/Yb3f8gG/1eff6587d3f998410893fbea6253b1ab.jpg",
    "https://i.ibb.co/m8LDsHt/2a5b74c1448b64e219da3a59011b75bd.jpg",
    "https://i.ibb.co/KmSgMfc/2c93bb90ede01d23850da0f7b835bc47.png",
    "https://i.ibb.co/wz9ByV7/2f3740341c8450b9f4de361176376065.jpg",
    "https://i.ibb.co/tJ55Khj/2lkaszq5b9t41.jpg",
    "https://i.ibb.co/Sxnc1Lk/2tu275rjc2u41.jpg",
    "https://i.ibb.co/TB2T5g8/03ba0bda1d0c296804e4fe8efc46bc8e.jpg",
    "https://i.ibb.co/gMC4kNs/03c5be525f07a9b30950d562e5fe288d.png",
    "https://i.ibb.co/pxJjXqh/3b27a29cad78854f6de91b8b38e65be1.jpg",
    "https://i.ibb.co/t8Cf61L/3c447d42377fe68beeaed56d7d34f960.jpg",
    "https://i.ibb.co/m8Ctvwc/3c552e042cbc2adb90bf26a26813726e7b4ddedcr1-1524-2048v2-uhq.jpg",
    "https://i.ibb.co/MBBTVY0/4a0acbf43d29d17d3a1fbdc692d090e6.jpg",
    "https://i.ibb.co/RTxM9z6/4b1dcfed9fd90de997c6c73e0bbe9aca.jpg",
    "https://i.ibb.co/cgyCbQW/4b1861ed896c20b41df2dbd706617136.jpg",
    "https://i.ibb.co/3kWDMvT/5c02ebcbe7aad58903302ada9d42c679.jpg",
    "https://i.ibb.co/qWpP1G1/5d7882ebd19d716eddfc3267f8a06b8d.jpg",
    "https://i.ibb.co/xXvTSJS/5db002997007e3794bf582c0efcee7e4.jpg",
    "https://i.ibb.co/2P00mz8/5f2fc34bd4ca3cdeea5635d813c93e58.jpg",
    "https://i.ibb.co/zJkcX7f/6b9e964f72cc54598c8f8774b0b4baf3.jpg",
    "https://i.ibb.co/XLNkSJF/6b1265a579f862a780c653f37b835a1f.jpg",
    "https://i.ibb.co/BK1gfSw/6cde98d87277fc6461f843be2ef00a97.jpg",
    "https://i.ibb.co/ctLn7Hc/6d117b73c3151b256c4aef4667213e65.jpg",
    "https://i.ibb.co/LR57wY0/7b0c4f8a23f7502f8d64bf78ffcc44ca.jpg",
    "https://i.ibb.co/hDTwnsV/7ba0c9ad848263c889b561041dea080c.jpg",
    "https://i.ibb.co/mFCVbVn/7c15507aa14fba9c159b719bc3fda7f0.jpg",
    "https://i.ibb.co/WsfNw28/7cc6cf00220248cd400f22fce85ceb15.jpg",
    "https://i.ibb.co/K6sy8Ls/7d7d18eefc516642d48edabf161c952a.jpg",
    "https://i.ibb.co/hYPzZ3V/7db7254ebb85370e6017c29b7b3695c1.jpg",
    "https://i.ibb.co/cgj4mdq/7fd80e3c4628d962426fa8cc38291393.jpg",
    "https://i.ibb.co/GkXdJjB/8c867556eac36e97e48b55c50e7bc6ce.jpg",
    "https://i.ibb.co/hVygmsp/8dd91f15c7d7beea7cbcfe51d510be45.jpg",
    "https://i.ibb.co/87WpNtQ/8fac2e21a7202a8c71c64263815b9022.png",
    "https://i.ibb.co/cXr2kVR/9b87b68ec4692b1f0d559e25a084aa91.jpg",
    "https://i.ibb.co/w7j1SHb/10e885a078f58a9ed9bc03282814bd95.jpg",
    "https://i.ibb.co/dPjZy1K/12d4b5f4baaecc1c945f826d15816d4e.jpg",
    "https://i.ibb.co/FxSTk0q/13f98340c4df9bc32b9d89407c384a3a.jpg",
    "https://i.ibb.co/dcGCn4j/14d059bfeb162e28b92e1021538c4926.jpg",
    "https://i.ibb.co/0hnhp0P/22b633b9bde070b9f2aa77bdf0518da1.jpg",
    "https://i.ibb.co/NsypJB7/22dc0c0cadee8e69548e811547b440d6.jpg",
    "https://i.ibb.co/wYBWYqg/32b06e6a83ce3c2880ed9e80c9c8b297.jpg",
    "https://i.ibb.co/XxJ1swg/35aaba0a58cabb7b3f5a5ca768f33370.jpg",
    "https://i.ibb.co/L5kWSZ5/37ea4378411280b01c79c34b8fd260a3.jpg",
    "https://i.ibb.co/r3NrgZZ/40fa3300bf8601365854c52ca54a875d.jpg",
    "https://i.ibb.co/JnpDVpW/48d708ff9059867ec74ceb1e89a34cc1.jpg",
    "https://i.ibb.co/c2scdRm/59eqanediis41.jpg",
    "https://i.ibb.co/hLqs9LZ/66b06ca8994585dc40b18cdf6f62cc24.jpg",
    "https://i.ibb.co/tmqFZLT/70-706925-anime-boy-cute-nekoboy-neko-cute-anime-boy.png",
    "https://i.ibb.co/k6JdWMx/81b90382c36db7ed6cb3b84102530a24.jpg",
    "https://i.ibb.co/DfLjJWg/81ed69f3d889f86effca3f1cf0d61fdb.jpg",
    "https://i.ibb.co/SfcDk5Y/90fd335608925c152f4668777c8bae73.jpg",
    "https://i.ibb.co/5TGvhPf/0109fb4e140c9a3436fe19d4c1dc1969.jpg",
    "https://i.ibb.co/LYjNKHj/111-1115093-anime-boy-clipart-neko-cute-anime-boy-chibi.jpg",
    "https://i.ibb.co/28b455v/136adbd08ffc3be00c6d43e6ddb099b4.jpg",
    "https://i.ibb.co/kJfNMzr/139b98a4ec1cdca0ecba5fdc82aab898.jpg",
    "https://i.ibb.co/P5DLLCW/147-1470161-png-black-and-white-stock-boy-and-png.jpg",
    "https://i.ibb.co/1MVWvHs/167-1676298-cute-anime-boys-neko-hd-png-download.png",
    "https://i.ibb.co/8zGQJKw/190ad5de4f9083a01a68d6cd18febf61.jpg",
    "https://i.ibb.co/6PsKB1G/204c071e146be0ebcc5823f731bc7c76.png",
    "https://i.ibb.co/0G2YwvT/207-2078047-neon-boy-neon-boy-minecraft-skin-png-anime.png",
    "https://i.ibb.co/74mBMNT/244ab4a516f8eb762b0270259073ec61.jpg",
    "https://i.ibb.co/KFg8hZ2/278-2784512-neko-nekoboy-animeboy-anime-boy-catboy-cat-kitty.jpg",
    "https://i.ibb.co/HnbJ3Lm/292c82fb5d7f43c9a72c2cd071f07f94.jpg",
    "https://i.ibb.co/GcCVKgj/310a27b43fcb8444715929ea484ac3a5.jpg",
    "https://i.ibb.co/5nxKW26/333b588e4b51f75494aaf412c4bd39ce.jpg",
    "https://i.ibb.co/JsBG934/344-3443220-nekoboy-neko-boyneko-catboy-animeboy-boyanime-neko-boy.jpg",
    "https://i.ibb.co/2tC59Jz/422-4229795-manga-boy-anime-boys-hot-anime-boy-anime.jpg",
    "https://i.ibb.co/S6NqN0V/459a94df4b6050109c5b9312eb85a10f.jpg",
    "https://i.ibb.co/wBX63px/521-5218307-neko-anime-cat-boy-cute-hd-png-download.png",
    "https://i.ibb.co/GsZ9vy9/521b2cd1e7fcf29f2950a6d8a08ef34e.jpg",
    "https://i.ibb.co/cC72xXR/602c878f971b6e34dcc2571d189ca73f.jpg",
    "https://i.ibb.co/df85cy8/617edb102b322d78aafdf436c22801a9.jpg",
    "https://i.ibb.co/yfFxMKh/684fcde3e49bf4e366c34dc6df9cc79c.jpg",
    "https://i.ibb.co/93FDnM6/708db940c2b073616968fca28c2e2f01.jpg",
    "https://i.ibb.co/Qbr1N37/770a3ecb761ca725ccc4b7b48cf78d14.jpg",
    "https://i.ibb.co/3TYd4cZ/814eb5ed3a325cf5098933c64463d779.jpg",
    "https://i.ibb.co/Fh2JW3Q/819eecd4d79c9c42d4a17c03f17ffeca.jpg",
    "https://i.ibb.co/Mhmdbrb/866c974e8913607a2a44c378b3d290c7.jpg",
    "https://i.ibb.co/mJTs5TN/0913dce97efdab74b58028df0a14025b.jpg",
    "https://i.ibb.co/jGG5bx9/961da7b87298eccb80e0f6f133a7d238.jpg",
    "https://i.ibb.co/SdB3tPZ/4143e3a584b58ee35e6784cf91c173d8.jpg",
    "https://i.ibb.co/qBcnkg5/4145ef093f2532de5916cf9a76da92cd.jpg",
    "https://i.ibb.co/5WBgQ4N/4364e08325adb725292f7752243c12ae.jpg",
    "https://i.ibb.co/C2YHs3v/4675d848662bec83606375f3ca3c8497.jpg",
    "https://i.ibb.co/Bf6kcM7/4787a9a2ae498d4edff4cf7042f3cea1.jpg",
    "https://i.ibb.co/0Czm2x5/5593f2f405f7ce62db48e03a893f22f2.jpg",
    "https://i.ibb.co/km3yHV8/7018dacc62e074ef58ff97d23c6e8b28.jpg",
    "https://i.ibb.co/FxXPyNB/07999b28495ce47ffdd111a90fe4ead5.jpg",
    "https://i.ibb.co/GJWkbGw/8071ff1fc903ed11e9c38ce5da30d619.jpg",
    "https://i.ibb.co/YNfMHqh/8321bdf2c7b94f32506107ca14b7f38f-2.jpg",
    "https://i.ibb.co/YNfMHqh/8321bdf2c7b94f32506107ca14b7f38f-2.jpg",
    "https://i.ibb.co/ZW4SRsf/8716fa73bb2fb9bc9c2d520e3fe11853.jpg",
    "https://i.ibb.co/rf83s6y/8997ec6fa5f0c47f036bbca929a7684a.jpg",
    "https://i.ibb.co/TvT6R0K/9895af4b95765352a7dbdca1dd5b5ea5.jpg",
    "https://i.ibb.co/vZ8X0kD/18216f02239be98a56625f67d4c54c88.jpg",
    "https://i.ibb.co/t24W0dL/18419d2d8b4bdcddec301d158f19f32a.jpg",
    "https://i.ibb.co/GdSNxfJ/40572abaaf860ccc8803ad1caa9a46a5.jpg",
    "https://i.ibb.co/RNkvGjt/58116a15610b55c36db5c1a840a1ecf1.jpg",
    "https://i.ibb.co/Y8CzHv3/59529b2300e54e77ce2951dc0750efb0.jpg",
    "https://i.ibb.co/cCTqZxQ/62810caa8e8bdd667b5d5d45169cd12e.png",
    "https://i.ibb.co/Xs3WncL/77244d3a3a5487300d4da8e857731924.jpg",
    "https://i.ibb.co/qCwpN9D/509258a314f93ad87b58e86c69c43fdd.jpg",
    "https://i.ibb.co/f1xWxrQ/687451edf9df140278d05dbe3d31307f.jpg",
    "https://i.ibb.co/LJDV5jc/708889d8a910d31a1d40d96709449d56.jpg",
    "https://i.ibb.co/9NKWG6k/906736db022fc2a329a1973088d5d029-2.jpg",
    "https://i.ibb.co/9NKWG6k/906736db022fc2a329a1973088d5d029-2.jpg",
    "https://i.ibb.co/ngnjQbD/4032536d4b845c5f0548d9e875d7033c.jpg",
    "https://i.ibb.co/k4cnTHB/6423969-catboy-neko-boy-png-download.jpg",
    "https://i.ibb.co/KVcxN2w/6506618b883dc7659832b5ed41198ca8.jpg",
    "https://i.ibb.co/NKhF2Hx/8937038-full-anime-half-human-coloring-pin-on-anime-boys.jpg",
    "https://i.ibb.co/M64zLc8/144351088-288-k35421.jpg",
    "https://i.ibb.co/HFtnHFB/537257526c6cc616c305fa4155deac2f.jpg",
    "https://i.ibb.co/cy5y2Z8/1516599283-azuratyan.jpg",
    "https://i.ibb.co/QDfgnNy/13445960848da786b7ff9536483423c5.jpg",
    "https://i.ibb.co/g3pWLSD/643317676584c547d87000e2d90b9874.jpg",
    "https://i.ibb.co/m0L2B4k/a5d0b7cc0184182397f5a77d242e0569.jpg",
    "https://i.ibb.co/ynM0wwV/a9a23bb63fda8910a8e77fcf92b8006b.jpg",
    "https://i.ibb.co/pdZ213G/a9f3c1e42193949586c05db57b7eda0c.jpg",
    "https://i.ibb.co/vQrxc5C/a044b2fbe47b69be597baad264599c56.jpg",
    "https://i.ibb.co/7n94DqY/a47adaa08cb740350ebc5817e72de183.png",
    "https://i.ibb.co/PxfY1Mf/a363f5fc2caeac66f9b1b66e5f3c65bd-2.jpg",
    "https://i.ibb.co/PxfY1Mf/a363f5fc2caeac66f9b1b66e5f3c65bd-2.jpg",
    "https://i.ibb.co/Y2d8WMp/a635df8f6152255c3b665bbaebc11e27.jpg",
    "https://i.ibb.co/Wkh69rT/a1847eb9e567b99c57b437827c6347bc.jpg",
    "https://i.ibb.co/pXvrPKD/a5454d1f753b5040ec9d40954bb1b678.png",
    "https://i.ibb.co/hd0Qv4T/aaiu4j8yeil41.png",
    "https://i.ibb.co/0rD6dc3/add5c4bc3b729c5a298f7beee68857ca.jpg",
    "https://i.ibb.co/P44kQ19/aec42862a67cb9ec42773774197cb8fd.png",
    "https://i.ibb.co/rMrxqhv/anime-boy-kawaii-neko-png-download-anime-boys-with-cat-ears-neko-boy-png-920-1076.jpg",
    "https://i.ibb.co/8c1mnhf/anime-boy-kawaii-neko-png-download-transparent-png-898x996-neko-boy-png-840-971.jpg",
    "https://i.ibb.co/Gcq7zt7/b6ae86b2896a5623311b150ab2944e75.jpg",
    "https://i.ibb.co/16H36R6/b28b3c197702ebfa5362a4c23dacd0c2.jpg",
    "https://i.ibb.co/Xt0wW9b/b687be7b89a32d00306e7c8049a62a0e.jpg",
    "https://i.ibb.co/r6r6JRB/b1080b90cd1409379c1a5136cf953fb3.jpg",
    "https://i.ibb.co/Csx18N5/b657326b1ba43ed9eca03436aea4c501.jpg",
    "https://i.ibb.co/KwqD1FG/b8172593f8d687c4eee63d93339bd0ba.png",
    "https://i.ibb.co/DGbTSvc/bad223cb3acb2bc1a7457bf014c053d7.jpg",
    "https://i.ibb.co/z2NSPDR/bcd12fefecd911ba1417e4964ff81426.png",
    "https://i.ibb.co/1ssrW7B/bd97b31dd7d1912f4fa0aa26cb952fa2.jpg",
    "https://i.ibb.co/frqHwzn/bd751b8f36bbb2b35c20b08e52656f39.jpg",
    "https://i.ibb.co/BKNjLn5/bdd038c89b98ae817f0673eb01401bea.jpg",
    "https://i.ibb.co/svsdYbx/bfb5319740fca80aa6b1cf303bcc023e.jpg",
    "https://i.ibb.co/PGgY5CV/c4a648a211fbcc7bf5135604ed22cf8b.jpg",
    "https://i.ibb.co/r6rMFmV/c5cecbb42ae8da6548622e96665ada82.jpg",
    "https://i.ibb.co/fnrMyyn/c42c2a687a108a33a18c3b0591a1c597.jpg",
    "https://i.ibb.co/Lp40WpZ/c80b092a4edf81e40e8d4bd5d6f3a756.jpg",
    "https://i.ibb.co/mtH4pkB/c8106dfdd071a9346c475fd84c1ff331.jpg",
    "https://i.ibb.co/PGzXybv/c894138a0ee34a6b3cfe4f64f1fa8384.jpg",
    "https://i.ibb.co/FwNSHqz/c7168781b5f749403feca4075636e4f9-anime-boys-cute-anime-guys.jpg",
    "https://i.ibb.co/YP4mRb9/cc19195ddefb84a1b54c63c7e0c1f725.png",
    "https://i.ibb.co/BPjjsNh/cd3c8ea7812a63de81a141d3a0d29905.jpg",
    "https://i.ibb.co/jyV59Db/cute-neko-boy-ych-by-ohano-woo-ddcf2so-pre.jpg",
    "https://i.ibb.co/VMxccKf/d3b8df9afa703c9b38d4532189b309f8.jpg",
    "https://i.ibb.co/Byn8NQb/d9b11e26e3e949ea28bd6d0f498920d1.jpg",
    "https://i.ibb.co/z526qpM/d56a16bb904a84cfeb583c8981c0b390.jpg",
    "https://i.ibb.co/HFxS9P5/d524a3e8da20530364df7978eb0be355.jpg",
    "https://i.ibb.co/bzd1JF0/d755d3376c1e209f961b24ec455f5b7c.jpg",
    "https://i.ibb.co/JtFNqKm/d933d72cfe6b7082aaea1b2df474ae0f.jpg",
    "https://i.ibb.co/R0VK83D/da765a709ffb912dc513bd9038e8e471.jpg",
    "https://i.ibb.co/BB4tNjr/dbdfcc9fc926ba23c7ced81c07548c92.png",
    "https://i.ibb.co/tZNj5DV/de4d91d7e5aede2e414ee55f6c9cbd0b.jpg",
    "https://i.ibb.co/fkMtcC9/dta-closed-neko-boys-by-kittyfrost21-dcorlhx-fullview.jpg",
    "https://i.ibb.co/Vjq3kVF/e2abe8fa51bc40585ffe38283bf4e89c.jpg",
    "https://i.ibb.co/7Yfkw1Z/e5cf9de08f62cfddf8c523d1d94ad09c.jpg",
    "https://i.ibb.co/98z0h8n/e016d6de28256d61fdeafd00fee7d087.png",
    "https://i.ibb.co/0XGSN2r/e85478abf7bb3583989e65bb60480d6b.jpg",
    "https://i.ibb.co/5MmygwD/ebcaf2fd497f18a4ec38b8a54695e6dc.jpg",
    "https://i.ibb.co/pjLhJSF/ec0742b3d7554bc05be272af983b499f.jpg",
    "https://i.ibb.co/9tC0SMH/emo-catboy-anime-16215607-306-570.gif",
    "https://i.ibb.co/T43rcfq/f5b5a2b29a549cc7380310d680b445d5.jpg",
    "https://i.ibb.co/wyGjhNm/f7ddfc6dd579e54b0ae896e6ec1eee22.jpg",
    "https://i.ibb.co/BgfjLpV/f45dc881e4a78ca6b3998db8981c719c.png",
    "https://i.ibb.co/tPwJpWH/f574076eba2a2beec14bf099311cc5b4.jpg",
    "https://i.ibb.co/308JscJ/f438098375e2bd65f14e621c97ba8240.jpg",
    "https://i.ibb.co/nny5Vm1/faa28cb9765e3de7f4033497af52001d.jpg",
    "https://i.ibb.co/cxHLZ0g/fc0dd921b9e3404ad1ab8f9943c9b690328c8a31-hq.jpg",
    "https://i.ibb.co/kghwfhv/fc7285a746b2f9ca460a58ced95712a1.png",
    "https://i.ibb.co/Gp65Mdw/fcd5a3584ceaa9e5325886ffc7dd5407.jpg",
    "https://i.ibb.co/JsNZHwG/fd5b96cb99cc04b6cd2b7379090b6896.jpg",
    "https://i.ibb.co/fY8mgm0/fdb1eee755159917c528ac69abf31ec5.jpg",
    "https://i.ibb.co/HK1r5Xf/fea2e51ecaaff443a4129d166051b920.jpg",
    "https://i.ibb.co/cLcDh88/fsvifqxki2t41.jpg",
    "https://i.ibb.co/HFtnHFB/537257526c6cc616c305fa4155deac2f.jpg",
    "https://i.ibb.co/Y7YQTYZ/gd8ysbrl7mq41.png",
    "https://i.ibb.co/tLMZ2yS/HD-Cute-Anime-Boy-Png-Anime-Boy-Neko-Headphones.png",
    "https://i.ibb.co/QPPJ4R3/maxresdefault.jpg",
    "https://i.ibb.co/GHQBjPH/neko-boy-in-hoodie-by-risa-neko-dcivtc4-fullview.jpg",
    "https://i.ibb.co/B6tCYCf/npyi8sbh7ap41.jpg",
    "https://i.ibb.co/dMTQYS8/nxm5db538iz41.jpg",
    "https://i.ibb.co/wBKXPp4/ofbafa417i051.jpg",
    "https://i.ibb.co/vD5MMkg/original-1.jpg",
    "https://i.ibb.co/qk7WfjJ/original-2.png",
    "https://i.ibb.co/bPdqVct/original.jpg",
    "https://i.ibb.co/nkyvfPj/original.png",
    "https://i.ibb.co/w7tXHKD/pic-1468876128-1001.jpg",
    "https://i.ibb.co/qML41HN/qae2t268zj551.png",
    "https://i.ibb.co/Wn08zJp/rz9xtxegvvq41.jpg",
    "https://i.ibb.co/wYqcpzQ/the-cat-boy-is-a-maid-by-arisenchi-ddu9u86-fullview.jpg",
    "https://i.ibb.co/zFfp6Z5/tumblr-nm4qc3-M3b-M1ru0b90o2-1280.jpg",
    "https://i.ibb.co/Kzmhd2d/tumblr-nvit0l-OHu41tiadgbo1-1280.jpg",
    "https://i.ibb.co/vPG0krd/tymqu8z6ku751.png",
    "https://i.ibb.co/8s3qVDB/unnamed.png",
    "https://i.ibb.co/42SyYx0/vsiuztezbyq41.jpg",
    "https://i.ibb.co/JBGtcwp/wp6194096.jpg",
  ];

  var randomNumber = Math.floor(Math.random() * picLinks.length);
  const randomLink = picLinks[randomNumber];
  const color = "#" + generateRandomColor();
  const avatarEmbed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("Muta Meow (^_^)")
    .setImage(randomLink, { size: 4096 });
  message.channel.send(avatarEmbed);
};

module.exports = mutameow;
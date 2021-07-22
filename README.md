# wrs-bmkg
Wrapper tidak resmi yang digunakan untuk mendapatkan informasi gempa dari WRS-BMKG

## Catatan
Wrapper ini bukanlah wrapper resmi yang dibuat oleh pihak-pihak BMKG. Wrapper ini hanya menggunakan API endpoint yang dibuat oleh pihak-pihak BMKG, dan bekerja secara Polling. 

Wrapper ini sengaja dibuat hanya untuk pembelajaran semata. dan Tidak bekerja sama dengan BMKG sama sekali. Wrapper ini masih belum dijamin bekerja 100%. Jadi jika anda menemukan bug, Mohon buka isu di [Github](https://github.com/Yonle/wrs-bmkg.js/issues). Terima kasih.

# Installasi
```sh
npm install wrs-bmkg
```

# API
### module(opt)
Sebuah function untuk membuat listener baru. Nama Event diemit berdasarkan dari endpoint.

* `apiURL` - URL / Letak URL Endpoint yang akan digunakan untuk mengirim request ke path `datagempa.json`, `lastQL.json`, dan `gempaQL.json`.

#### Event: incommingBody
Sebuah event yang biasanya diemit setiap polling dengan respon `body`.

#### Event: incommingBody_lastQL
Sama seperti event `incommingBody`, Namun untuk Gempa Realtime.

#### Event: Gempabumi (Dari respon endpoint WRS-BMKG)
Sebuah event yang biasanya datang dari respon endpoint WRS-BMKG. 

#### Event: realtime
Sebuah event yang digunakan untuk mendapatkan informasi gempa realtime.

#### Event: error
Event yang biasanya digunakan untuk menangkap error saat request ke WRS-BMKG.

Event lainnya yang biasanya tidak ada di list ini biasanya direspon dari endpoint WRS-BMKG.

### await wrs.gempaQL()
Function yang digunakan untuk mendapatkan histori gempa. Returns `Array`.

### wrs.lastAlert
Informasi Alert sebelumnya.

### wrs.lastRealtimeQL
Informasi Gempa bumi realtime sebelumnya.

### wrs.startPolling
Mulai Polling.

### wrs.stopPolling
Berhenti Polling.

# Contoh
```js
const wrs = require("wrs-bmkg")();

wrs.on('Gempabumi', data => console.log(data.description));

wrs.startPolling();
```

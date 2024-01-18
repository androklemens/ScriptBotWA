
require('./setting')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@whiskeysockets/baileys')
const { getAggregateVotesInPollMessage, downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, MessageType, buttonsMessage } = require("@whiskeysockets/baileys")
const { exec, spawn } = require("child_process");
const { color, bgcolor, pickRandom, randomNomor } = require('./lib/console.js')
const { isUrl, getRandom, getGroupAdmins, runtime, sleep, reSize, makeid, fetchJson, getBuffer } = require("./lib/myfunc");
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/addlist');
const { addResponTesti, delResponTesti, isAlreadyResponTesti, sendResponTesti, updateResponTesti, getDataResponTesti } = require('./lib/respon-testi');
const { addResponProduk, delResponProduk, resetProdukAll, isAlreadyResponProduk, sendResponProduk, updateResponProduk, getDataResponProduk } = require('./lib/respon-produk');
// apinya
const fs = require("fs");
const ms = require("ms");
const chalk = require('chalk');
const axios = require("axios");
const colors = require('colors/safe');
const ffmpeg = require("fluent-ffmpeg");
const moment = require("moment-timezone");
const { TelegraPh, UploadFileUgu } = require('./lib/Upload_Url');

// Database
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'));
const antilink2 = JSON.parse(fs.readFileSync('./database/antilink2.json'));
const mess = JSON.parse(fs.readFileSync('./mess.json'));
const db_error = JSON.parse(fs.readFileSync('./database/error.json'));
const db_user = JSON.parse(fs.readFileSync('./database/pengguna.json'));
const db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));
const db_respon_testi = JSON.parse(fs.readFileSync('./database/list-testi.json'));
const db_respon_produk = JSON.parse(fs.readFileSync('./database/list-produk.json'));
const { addSaldo, minSaldo, cekSaldo } = require("./lib/deposit");
let db_saldo = JSON.parse(fs.readFileSync("./database/saldo.json"));
const {payment, apikeyOtpKu} = require("./setting")
let depositPath = "./database/deposit/"
let topupPath = "./database/topup/"

moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(ramz, msg, m, setting, store) => {
try {
const { type, quotedMsg, mentioned, now, fromMe, isBaileys } = msg
if (msg.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const time = moment(new Date()).format("HH:mm");
const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
global.prefa = ['','.']
const prefix = prefa ? /^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const isOwner = [`${global.ownerNumber}`,"6285791220179@s.whatsapp.net","6285806240904@s.whatsapp.net"].includes(sender) ? true : false
const pushname = msg.pushName
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = chats.startsWith(prefix);
const command = chats.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? chats.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const botNumber = ramz.user.id.split(':')[0] + '@s.whatsapp.net'

// Group
const groupMetadata = isGroup ? await ramz.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
const isAntiLink = antilink.includes(from) ? true : false
const isAntiLink2 = antilink.includes(from) ? true : false

// Quoted
const quoted = msg.quoted ? msg.quoted : msg
const isImage = (type == 'imageMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isMedia = (type === 'imageMessage' || type === 'videoMessage');
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isVideo = (type == 'videoMessage')
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isSticker = (type == 'stickerMessage')
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
var dataGroup = (type === 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
var dataPrivate = (type === "messageContextInfo") ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isButton = dataGroup.length !== 0 ? dataGroup : dataPrivate
var dataListG = (type === "listResponseMessage") ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ''
var dataList = (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : ''
const isListMessage = dataListG.length !== 0 ? dataListG : dataList

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = ramz.sendMessage(from, { text: teks, mentions: mems })
return res
} else {
let res = ramz.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

async function downloadAndSaveMediaMessage (type_file, path_file) {
if (type_file === 'image') {
var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]) }
fs.writeFileSync(path_file, buffer)
return path_file } 
else if (type_file === 'video') {
var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'sticker') {
var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file
} else if (type_file === 'audio') {
var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync(path_file, buffer)
return path_file}
}

const reply = (teks) => {ramz.sendMessage(from, { text: teks }, { quoted: msg })}

//Antilink
if (isGroup && isAntiLink && isBotGroupAdmins){
if (chats.includes(`https://chat.whatsapp.com/`) || chats.includes(`http://chat.whatsapp.com/`)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('bot bebas Share link')
await ramz.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
ramz.groupParticipantsUpdate(from, [sender], "remove")
}
}

//Antilink 2
if (isGroup && isAntiLink2 && isBotGroupAdmins){
if (chats.includes(`https://chat.whatsapp.com/`) || chats.includes(`http://chat.whatsapp.com/`)) {
if (!isBotGroupAdmins) return reply('Untung bot bukan admin')
if (isOwner) return reply('Untung lu owner ku:v😙')
if (isGroupAdmins) return reply('Admin grup mah bebas ygy🤭')
if (fromMe) return reply('bot bebas Share link')
await ramz.sendMessage(from, { delete: msg.key })
reply(`*「 GROUP LINK DETECTOR 」*\n\nTerdeteksi mengirim link group,Maaf sepertinya kamu akan di kick`)
}
}

let cekUser = (satu, dua) => { 
let x1 = false
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){x1 = i}})
if (x1 !== false) {
if (satu == "id"){ return db_user[x1].id }
if (satu == "name"){ return db_user[x1].name }
if (satu == "seri"){ return db_user[x1].seri }
if (satu == "premium"){ return db_user[x1].premium }
}
if (x1 == false) { return null } 
}
let setUser = (satu, dua, tiga) => { 
Object.keys(db_user).forEach((i) => {
if (db_user[i].id == dua){
if (satu == "±id"){ db_user[i].id = tiga
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±name"){ db_user[i].name = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±seri"){ db_user[i].seri = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
if (satu == "±premium"){ db_user[i].premium = tiga 
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))} 
}})
}
function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

//FUNCTION DEPOSIT
if (chats === "payment_ovo") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "OVO",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke kak mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
} else if (chats === "payment_qris") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "QRIS",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke kak mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
} else if (chats === "payment_dana") {
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
var deposit_object = {
ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
session: "amount",
date: new Date().toLocaleDateString("ID", { timeZone: "Asia/Jakarta"}),
number: sender,
payment: "DANA",
data: {
amount_deposit: ""
}
}
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(deposit_object, null, 2))
reply("Oke kak mau deposit berapa?\n\nContoh: 15000")
} else {
reply("Proses Deposit kamu masih ada yang belum terselesaikan\n\nKetik Batal untuk membatalkan")
}
}

if (fs.existsSync(depositPath + sender.split("@")[0] + ".json")) {
if (!msg.key.fromMe) {
let data_deposit = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))
if (data_deposit.session === "amount") {
if (isNaN(chats)) return reply("Masukan hanya angka ya")
data_deposit.data.amount_deposit = Number(chats);
if (data_deposit.data.amount_deposit < 1500) return reply(`Deposit Minimal Rp1.500`)
data_deposit.session = "konfirmasi_deposit";
fs.writeFileSync(depositPath + sender.split("@")[0] + ".json", JSON.stringify(data_deposit, null, 3));
reply(`「 𝙆𝙊𝙉𝙁𝙄𝙍𝙈𝘼𝙎𝙄-𝘿𝙀𝙋𝙊𝙎𝙄𝙏 」

▪ ID : ${data_deposit.ID}
▪ Nomer : ${data_deposit.number.split('@')[0]}
▪ Payment : ${data_deposit.payment}
▪ Jumlah Deposit : Rp${toRupiah(data_deposit.data.amount_deposit)}
▪ Pajak Admin : Rp1000
▪ Total Pembayaran : Rp${toRupiah(data_deposit.data.amount_deposit+1000)}

_Deposit akan dibatalkan otomatis apabila terdapat kesalahan input._

_Ketik Lanjut untuk melanjutkan_
_Ketik Batal untuk membatalkan_`)
} else if (data_deposit.session === "konfirmasi_deposit") {
if (chats.toLowerCase() === "lanjut") {
if (data_deposit.payment === "OVO") {
var py_ovo=`༆━━[ *PAYMENT OVO* ]━━࿐
 
*Nomer :* ${payment.ovo.nomer}
*AN :* ${payment.ovo.atas_nama}

_Silahkan transfer dengan nomor yang sudah tertera, Jika sudah harap kirim bukti foto dengan caption #bukti untuk di acc oleh admin_`
reply(py_ovo)
} else if (data_deposit.payment === "QRIS") {
var qr_fexf =`༆━━[ *PAYMENT QRIS* ]━━࿐
 
*Url :* ${payment.qris.link_nya}
*AN :* ${payment.qris.atas_nama}

_Silahkan transfer dengan nomor yang sudah tertera, Jika sudah harap kirim bukti foto dengan caption #bukti untuk di acc oleh admin_`
ramz.sendMessage(from, {image:{url:payment.qris.link_nya}, caption:qr_fexf}, {quoted: msg})
} else if (data_deposit.payment === "DANA") {
var py_dana =`༆━━[ *PAYMENT DANA* ]━━࿐
 
*Nomer :* ${payment.dana.nomer}
*AN :* ${payment.dana.atas_nama}

_Silahkan transfer dengan nomor yang sudah tertera, Jika sudah harap kirim bukti foto dengan caption #bukti untuk di acc oleh admin_`
reply(py_dana)
}} else if (chats.toLowerCase() === "batal") {
reply(`Baik kak, Deposit Dengan ID : ${data_deposit.ID} dibatalkan 😊`)
fs.unlinkSync(depositPath + sender.split('@')[0] + '.json')
}}}}

// Response Addlist
if (isGroup && isAlreadyResponList(from, chats, db_respon_list)) {
var get_data_respon = getDataResponList(from, chats, db_respon_list)
if (get_data_respon.isImage === false) {
ramz.sendMessage(from, { text: sendResponList(from, chats, db_respon_list) }, {
quoted: msg
})
} else {
ramz.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, {quoted: msg})
}
}
if (!isGroup && isAlreadyResponTesti(chats, db_respon_testi)) {
var get_data_respon = getDataResponTesti(chats, db_respon_testi)
ramz.sendMessage(from, { image: { url: get_data_respon.image_url }, caption: get_data_respon.response }, { quoted: msg })
}
if (!isGroup && isAlreadyResponProduk(chats, db_respon_produk)) {
var get_data_respon = getDataResponProduk(chats, db_respon_produk)
ramz.sendMessage(from, { image: { url: get_data_respon.image_url }, caption: get_data_respon.response }, { quoted: msg })
}

const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return ramz.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}


const fkontak = { key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `Bot Created By ${global.ownerName}\n`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${global.botName},;;;\nFN:Halo ${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': { url: `${global.qris}` }}}}
function parseMention(text = '') {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}


// Console
if (isGroup && isCmd) {
console.log(colors.green.bold("[Group]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(groupName));
}

if (!isGroup && isCmd) {
console.log(colors.green.bold("[Private]") + " " + colors.brightCyan(time,) + " " + colors.black.bgYellow(command) + " " + colors.green("from") + " " + colors.blue(pushname));
}

function randomNomor(min, max = null) {
if (max !== null) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
} else {
return Math.floor(Math.random() * min) + 1
}
  }

// Casenya
switch(command) {
	case 'help':
	case 'menu':{
		if (cekUser("id", sender) == null) return ramz.sendMessage(from, { text: mess.OnlyUser, mentions: [global.ownerNumber, sender]}, { quoted: fkontak })
		const mark_slebew = '0@s.whatsapp.net'
const more = String.fromCharCode(8206)
const strip_ny = more.repeat(4001)
var footer_nya =`Creator by - ${global.ownerName}`
var ramex = `./SCRIPT BY RAMAA GNNZ`
let simbol = `${pickRandom(["⭔","⌬","〆","»"])}`
	let menu = `━━━━━[ *${global.botName.toUpperCase()}}* ]━━━━━


━━━━━『 𝘿𝘼𝙏𝘼 𝘽𝙊𝙏 』━━━━━

${simbol}ᴄʀᴇᴀᴛᴏʀ : @${global.kontakOwner}
${simbol}ʙᴏᴛ ɴᴀᴍᴇ : ${global.botName}
${simbol}ᴏᴡɴᴇʀ ɴᴀᴍᴇ : ${global.ownerName} 

━━━━━━━━━━━━━━━━━━



━━━━━『 𝗠𝗘𝗡𝗨 1 』━━━━━
${simbol} #buynokos (untuk membeli)
${simbol} #getservice (list layanan otp)
${simbol} #cekapk (cek detail layanan otp)
${simbol} #negara (list negara)
${simbol} #getstatus (status pesanan)
${simbol} #sendsms (trima sms otp)
${simbol} #resend (kirim ulang sms otp)
${simbol} #cansel (batalkan pesanan)
${simbol} #deposit
${simbol} #saldo

${simbol} #menu2 
━━━━━━━━━━━━━━━━━━◧

_Mohon Untuk janngan spam saat melakukan transaksi_`
ramz.sendMessage(from, {
text: menu},
 {quoted: fkontak})
}
break
case 'menu2':{
	let menu = `
┏━━━━『 𝙈𝙖𝙞𝙣 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .deposit
┣» .bukti
┣» .produk
┣» .listproduk
┣» .donasi
┣» .ping
┣» .test
┣» .pembayaran 
┣» .bayar
┣» .script
┣» .s
┣» .sticker 
┗━━━━━━━━━━━━━━━━━━◧


┏━━━━『 𝙂𝙧𝙤𝙪𝙥 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .hidetag
┣» .group open
┣» .group close 
┣» .antilink (kick)
┣» .antilink2 (no kick)
┣» .kick 
┣» .proses
┣» .done
┣» .linkgc
┣» .tagall
┣» .fitnah
┣» .revoke
┣» .delete
┃
┣» .addlist (Support image)
┣» .dellist
┣» .list 
┣» .shop
┣» .hapuslist
┗━━━━━━━━━━━━━━━━━━◧

┏━━━━『 𝙊𝙬𝙣𝙚𝙧 𝙈𝙚𝙣𝙪 』━━━━◧
┃
┣» .addsaldo
┣» .minsaldo
┣» .addtesti
┣» .deltesti
┣» .addproduk
┣» .delproduk
┣» .join
┣» .sendbyr 62xxx
┣» .block 62xxx 
┣» .unblock 62xxx
┗━━━━━━━━━━━━━━━━━━◧

┏━━━━『 Kalkulator 』━━━━◧
┃
┣» .tambah
┣» .kali
┣» .bagi
┣» .kurang 
┗━━━━━━━━━━━━━━━━━━◧


┏━━━『 SOSIAL MEDIA 』━━━◧
┃
┣» .ig
┣» .yt
┣» .gc
┣» .youtube
┣» .Instagram 
┣» .groupadmin
┗━━━━━━━━━━━━━━━━━━◧`
ramz.sendMessage(from, {text: menu}, {quoted: fkontak})
}
break
case 'verify':{
if (cekUser("id", sender) !== null) return reply('Kamu sudah terdaftar !!')
try {
var ppnu = await ramz.profilePictureUrl(sender, 'image')
} catch {
var ppnu = 'https://telegra.ph/file/6880771a42bad09dd6087.jpg'
}
var res_us = `${makeid(10)}`
var diacuk = `${db_user.length+1}`
var user_name = `#RAMZ${diacuk}`
let object_user = {"id": sender, "name": user_name, "seri": res_us, "premium": false}
db_user.push(object_user)
fs.writeFileSync('./database/pengguna.json', JSON.stringify(db_user))
mentions(`Memproses data user > @${sender.split("@")[0]}`, [sender])
await sleep(1500)
var verify_teks =`───「 𝗧𝗘𝗥𝗩𝗘𝗥𝗜𝗙𝗜𝗞𝗔𝗦𝗜 」────

⬣ Name : @${sender.split('@')[0]} 👤
⬣ Id : ${user_name} 🍁
⬣ Seri : ${res_us}  🌼

_Selamat Anda telah Terverifikasi Di database ${global.botName}_

Silahkan ketik #menu`
let but_verify = [
{ buttonId: '#menu', buttonText: {displayText: '️䳈 Mᴇɴᴜ'}, type: 1}
]
ramz.sendMessage(from, { image: { url: ppnu }, 
caption: verify_teks,
footer: 'Ramaa-gnnz',
mentions: [sender]},
{quoted: msg })
await sleep(1000)
var teksss_verify =`𝙍𝙀𝙂𝙄𝙎𝙏𝙀𝙍 𝙐𝙎𝙀𝙍
○ Name : @${sender.split('@')[0]} 👤
○ Seri : ${res_us} 🍁
○ Id : ${user_name} ✉️
○ Terdaftar : ${db_user.length} 🎖️`
ramz.sendMessage(`${global.ownerNumber}`, {text:teksss_verify, mentions: [sender]})
}
break
case 'deposit': case 'depo':{
reply(`╭━━━━━━━━━━━━━━━┅•ิ.•ஐ
│ *${ucapanWaktu} 🌻 @${sender.split('@')[0]}*                             
└┬────────────┾•ิ.•┽
┌┤ 𝖴𝗇𝗍𝗎𝗄 𝗆𝖾𝗅𝖺𝗄𝗎𝗄𝖺𝗇 𝖽𝖾𝗉𝗈𝗌𝗂𝗍, 
││𝗌𝗂𝗅𝖺𝗁𝗄𝖺𝗇 𝗉𝗂𝗅𝗂𝗁 𝗉𝖺𝗒𝗆ent 𝗒𝖺𝗇𝗀 
││𝗍𝖾𝗋𝗌𝖾𝖽𝗂𝖺.
││𝖲𝗂𝗅𝖺𝗁𝗄𝖺𝗇 𝗄𝖾𝗍𝗂𝗄 𝗌𝖾𝗌𝗎𝖺𝗂 𝗉𝖺𝗒𝗆𝖾𝗇𝗍
││ 𝗒𝖺𝗇𝗀 𝖽𝗂 𝗂𝗇𝗀𝗂𝗇𝗄𝖺𝗇.
││
││Untuk pengguna 
││Gopay, ovo, shopee pay, bank,
││silahkan untuk menggunakan
││ payment_qris
││
│└────────────┾•ิ.•┽
╰━━━━━━━━━━━━━━━━┅•ิ.•ஐ 


┏━━━━『 𝗣𝗮𝘆𝗺𝗲𝗻𝘁  』━━━━◧
┣» payment_qris
┣» payment_dana
┗━━━━━━━━━━━━━━━━━━◧`)
}
break
case 'saldo':{
reply(`*━━ CHECK YOUR INFO ━━*

 _• *Name:* ${cekUser("name", sender)}_
 _• *Resi:* ${cekUser("resi", sender)}_
 _• *Nomer:* ${sender.split('@')[0]}_
 _• *Saldo:* Rp${toRupiah(cekSaldo(sender, db_saldo))}_

Untuk menbahkan Saldo ketik #deposit

*Note :*
_saldo hanya bisa untuk buy nokos_
_tidak bisa ditarik atau transfer_!`)
}
break
case 'bukti':
if (!fs.existsSync(depositPath + sender.split("@")[0] + ".json")) return reply(`Maaf *${cekUser("name", sender)}* sepertinya kamu belum pernah melakukan deposit`)
if (isImage && isQuotedImage) return reply(`Kirim gambar dengan caption *#bukti* atau reply gambar yang sudah dikirim dengan caption *#bukti*`)
await ramz.downloadAndSaveMediaMessage(msg, "image", `./database/deposit/${sender.split('@')[0]}.jpg`)

let oke_bang = fs.readFileSync(`./database/deposit/${sender.split('@')[0]}.jpg`)
let data_depo = JSON.parse(fs.readFileSync(depositPath + sender.split("@")[0] + ".json"))

let caption_bukti =`「 *DEPOSIT USER* 」
⭔ID: ${data_depo.ID}
⭔Nomer: @${data_depo.number.split('@')[0]}
⭔Payment: ${data_depo.payment}
⭔Tanggal: ${data_depo.date.split(' ')[0]}
⭔Jumlah Deposit: Rp${toRupiah(data_depo.data.amount_deposit)}
⭔Pajak Admin : Rp1000
⭔Total Pembayaran : Rp${toRupiah(data_depo.data.amount_deposit+1000)}

Ada yang deposit nih kak, coba dicek saldonya, jika sudah masuk konfirmasi

Jika sudah masuk konfirmasi dengan cara klik *#accdepo*
Jika belum masuk batalkan dengan cara ketik *#rejectdepo*`

let bukti_bayar = {
image: oke_bang,
caption: caption_bukti,
mentions: [data_depo.number],
title: 'Bukti pembayaran',
footer: 'Press The Button Below',
headerType: 5 
}
ramz.sendMessage(`${global.ownerNumber}`, bukti_bayar)
reply(`Mohon tunggu ya kak, sampai di Konfirmasi oleh owner ☺`)
fs.unlinkSync(`./database/deposit/${sender.split('@')[0]}.jpg`)
break
case 'accdepo':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Contoh: ${prefix+command} 628xxx`)
let orang = q.split(",")[0].replace(/[^0-9]/g, '')
let data_deposit = JSON.parse(fs.readFileSync(depositPath + orang + '.json'))
addSaldo(data_deposit.number, Number(data_deposit.data.amount_deposit), db_saldo)
var text_sukses = `「 *DEPOSIT SUKSES* 」
⭔ID : ${data_deposit.ID}
⭔Name ${cekUser("name", sender)}
⭔Nomer: ${data_deposit.number.split('@')[0]}
⭔Payment: ${data_deposit.payment}
⭔Tanggal: ${data_deposit.date.split(' ')[0]}
⭔Jumlah Deposit: Rp${toRupiah(data_deposit.data.amount_deposit)}`
reply(`${text_sukses}\n`)
ramz.sendMessage(data_deposit.number, { text: `${text_sukses}\n\n_Deposit kamu telah dikonfirmasi oleh admin, silahkan cek saldo dengan cara ketik #saldo_`})
fs.unlinkSync(depositPath + data_deposit.number.split('@')[0] + ".json")
}
break
case 'rejectdepo':{
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Contoh: ${prefix+command} 628xxx`)
let orang = q.split(",")[0].replace(/[^0-9]/g, '')
let data_deposit = JSON.parse(fs.readFileSync(depositPath + orang + '.json'))
reply(`Sukses Reject ID Deposit : ${data_deposit.ID}`)
ramz.sendMessage(data_deposit.number, { text: `Maaf Deposit Dengan ID : *${data_deposit.ID}* Ditolak, Jika ada kendala hubungin Owner Bot.\nwa.me/${global.ownerNumber}`})
fs.unlinkSync(depositPath + data_deposit.number.split('@')[0] + ".json")
}
break
case 'addsaldo':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
if (!q.split("|")[0]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
if (!q.split("|")[1]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
addSaldo(q.split("|")[0]+"@s.whatsapp.net", Number(q.split("|")[1]), db_saldo)
await sleep(50)
ramz.sendTextMentions(from, `「 *SALDO USER* 」
⭔ID: ${q.split("|")[0]}
⭔Nomer: @${q.split("|")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo))}`, [q.split("|")[0]+"@s.whatsapp.net"])
ramz.sendTextMentions(q.split("|")[0]+"@s.whatsapp.net", `「 *SALDO USER* 」
⭔ID: ${q.split("|")[0]}
⭔Nomer: @${q.split("|")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo))}`, [q.split("|")[0]+"@s.whatsapp.net"])
break

case 'minsaldo':
if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
if (!q.split("|")[0]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
if (!q.split("|")[1]) return reply(`Ex : ${prefix+command} Nomor|Jumlah\n\nContoh :\n${prefix+command} 628817839722|20000`)
if (cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo) == 0) return reply("Dia belum terdaftar di database saldo.")
if (cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo) < q.split("|")[1] && cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo) !== 0) return reply(`Dia saldonya ${cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo)}, jadi jangan melebihi ${cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo)} yah kak??`)
minSaldo(q.split("|")[0]+"@s.whatsapp.net", Number(q.split("|")[1]), db_saldo)
await sleep(50)
ramz.sendTextMentions(from, `「 *SALDO USER* 」
⭔ID: ${q.split("|")[0]}
⭔Nomer: @${q.split("|")[0]}
⭔Tanggal: ${tanggal}
⭔Saldo: Rp${toRupiah(cekSaldo(q.split("|")[0]+"@s.whatsapp.net", db_saldo))}`, [q.split("|")[0]+"@s.whatsapp.net"])
break
case 'sticker': case 's': case 'stiker':{
if (isImage || isQuotedImage) {
let media = await downloadAndSaveMediaMessage('image', `./gambar/${tanggal}.jpg`)
reply(mess.wait)
ramz.sendImageAsSticker(from, media, msg, { packname: `${global.namaStore}`, author: `Store Bot`})
} else if (isVideo || isQuotedVideo) {
let media = await downloadAndSaveMediaMessage('video', `./sticker/${tanggal}.mp4`)
reply(mess.wait)
ramz.sendVideoAsSticker(from, media, msg, { packname: `${global.namaStore}`, author: `Store Bot`})
} else {
reply(`Kirim/reply gambar/vidio dengan caption *${prefix+command}*`)
}
}
break
case 'owner':{
var owner_Nya = `${global.ownerNumber}`
sendContact(from, owner_Nya, `${global.ownerName}`, msg)
reply('*Itu kak nomor owner ku, Chat aja gk usah malu😆*')
}
break
case 'yt':
case 'youtube':
	ramz.sendMessage(from, 
{text: `Jangan Lupa Subscriber yah kak😉🙏
*Link* : ${global.linkyt}`},
{quoted: msg})
break
case 'ig':
case 'instagram':
	ramz.sendMessage(from, {text: `Admin Kurang ngurus ig uyy Jadi subscribe aja YouTube admin\n\nLink \n${global.linkig}`},
{quoted: msg})
break
case 'gc':
case 'groupadmin':
	ramz.sendMessage(from, 
{text: `*Group  ${global.ownerName}*\n
Group1 : ${global.linkgc1}
Group2 : ${global.linkgc2}`},
{quoted: msg})
break
case 'donasi': case 'donate':{
let tekssss = `───「  *DONASI*  」────

*Payment donasi💰* 

- *Dana :* ${global.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Saweria :* ${global.sawer}
- *Qris :* Scan qr di atas

berapapun donasi dari kalian itu sangat berarti bagi kami 
`
ramz.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2022`},
{quoted: msg})
}
break
case 'sendbyr':{
	if (!isOwner) return reply(mess.OnlyOwner)
	if (!q) return reply('*Contoh:*\n.add 628xxx')
	var number = q.replace(/[^0-9]/gi, '')+'@s.whatsapp.net'
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* ${global.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Qris :* Scan qr di atas

_Pembayaran ini Telah di kirim oleh Admin_
_Melalui bot ini🙏_


OK, thanks udah order di *${global.namaStore}*
`
ramz.sendMessage(number, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2022`},
{quoted: msg})
reply (`Suksess Owner ku tercinta 😘🙏`)
}
break
case 'join':{
 if (!isOwner) return reply(mess.OnlyOwner)
if (!q) return reply(`Kirim perintah ${prefix+command} _linkgrup_`)
var ini_urrrl = q.split('https://chat.whatsapp.com/')[1]
var data = await ramz.groupAcceptInvite(ini_urrrl).then((res) => reply(`Berhasil Join ke grup...`)).catch((err) => reply(`Eror.. Munkin bot telah di kick Dari grup tersebut`))
}
break
case 'payment':
case 'pembayaran':
case 'bayar':{
let tekssss = `───「  *PAYMENT*  」────

- *Dana :* ${global.dana}
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Qris :* Scan qr di atas

OK, thanks udah order di *${global.botName}*
`
ramz.sendMessage(from, { image: fs.readFileSync(`./gambar/qris.jpg`),
 caption: tekssss, 
footer: `${global.ownerName} © 2022`},
{quoted: msg})
}
break
case 'proses':{
let tek = (`「 *TRANSAKSI PENDING* 」\n\n\`\`\`🎀 PRODUK : ${q}\n📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Pending\`\`\`\n\n*--------------------------*\n\n*Pesanan ini akan diproses manual oleh admin,* *Tunggu admin memprosesnya🙏*\n*Atau Chat : Wa.me//${global.kontakOwner}*`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE SAYA TUNGGU👍' }, type: 1 },
]
ramz.sendMessage(from,
{text: tek})
ramz.sendMessage(`${global.ownerNumber}`, {text: `*👋HALLO OWNER KU, ADA YANG ORDER PRODUK ${q} NIH*\n\n*DARI* : ${sender.split('@')[0]}`})
}
break
case 'done':{
let tek = (`「 *TRANSAKSI BERHASIL* 」\n\n\`\`\`📆 TANGGAL : ${tanggal}\n⌚ JAM     : ${jam}\n✨ STATUS  : Berhasil\`\`\`\n\nTerimakasih Telah order di *${global.namaStore}*\nNext Order ya🙏`)
let btn_menu = [
{buttonId: `${prefix}aokeguwgw`, buttonText: { displayText: 'OKE THENKS👍' }, type: 1 },
]
ramz.sendMessage(from,
{text: tek})
}
break
case 'tambah':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one + nilai_two}`)
break
case 'kurang':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one - nilai_two}`)
break
case 'kali':
if (!q) return reply(`Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one * nilai_two}`)
break
case 'bagi':
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`)
var num_one = q.split(' ')[0]
var num_two = q.split(' ')[1]
if (!num_one) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
if (!num_two) return reply(`Gunakan dengan cara ${prefix+command} *angka* *angka*\n\n_Contoh_\n\n${prefix+command} 1 2`)
var nilai_one = Number(num_one)
var nilai_two = Number(num_two)
reply(`${nilai_one / nilai_two}`)
break
case 'hidetag':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
ramz.sendMessage(from, { text: q ? q : '', mentions: mem })
break
case 'antilink':{
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply('Antilink sudah aktif')
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Activate Antilink In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply('Antilink belum aktif')
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply('Successfully Disabling Antilink In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'tagall':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!q) return reply(`Teks?\nContoh #tagall hallo`)
let teks_tagall = `══✪〘 *👥 Tag All* 〙✪══\n\n${q ? q : ''}\n\n`
for (let mem of participants) {
teks_tagall += `➲ @${mem.id.split('@')[0]}\n`
}
ramz.sendMessage(from, { text: teks_tagall, mentions: participants.map(a => a.id) }, { quoted: msg })
break
case 'fitnah':
if (!isGroup) return reply(mess.OnlyGrup)
if (!q) return reply(`Kirim perintah #*${command}* @tag|pesantarget|pesanbot`)
var org = q.split("|")[0]
var target = q.split("|")[1]
var bot = q.split("|")[2]
if (!org.startsWith('@')) return reply('Tag orangnya')
if (!target) return reply(`Masukkan pesan target!`)
if (!bot) return reply(`Masukkan pesan bot!`)
var mens = parseMention(target)
var msg1 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { extemdedTextMessage: { text: `${target}`, contextInfo: { mentionedJid: mens }}}}
var msg2 = { key: { fromMe: false, participant: `${parseMention(org)}`, remoteJid: from ? from : '' }, message: { conversation: `${target}` }}
ramz.sendMessage(from, { text: bot, mentions: mentioned }, { quoted: mens.length > 2 ? msg1 : msg2 })
break
case 'del':
case 'delete':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (!quotedMsg) return reply(`Balas chat dari bot yang ingin dihapus`)
if (!quotedMsg.fromMe) return reply(`Hanya bisa menghapus chat dari bot`)
ramz.sendMessage(from, { delete: { fromMe: true, id: quotedMsg.id, remoteJid: from }})
break
case 'linkgrup': case 'linkgc':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var url = await ramz.groupInviteCode(from).catch(() => reply(mess.error.api))
url = 'https://chat.whatsapp.com/'+url
reply(url)
break
case 'revoke':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
await ramz.groupRevokeInvite(from)
.then( res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply(mess.error.api))
break
case 'antilink2':{
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!args[0]) return reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : #${command} on`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink2) return reply('Antilink 2 sudah aktif')
antilink2.push(from)
fs.writeFileSync('./database/antilink2.json', JSON.stringify(antilink2, null, 2))
reply('Successfully Activate Antilink 2 In This Group')
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink2) return reply('Antilink 2 belum aktif')
let anu = antilink2.indexOf(from)
antilink2.splice(anu, 1)
fs.writeFileSync('./database/antilink2.json', JSON.stringify(antilink2, null, 2))
reply('Successfully Disabling Antilink 2 In This Group')
} else { reply('Kata kunci tidak ditemukan!') }
}
break
case 'group':
case 'grup':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
if (!q) return reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
if (args[0] == "close") {
ramz.groupSettingUpdate(from, 'announcement')
reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
} else if (args[0] == "open") {
ramz.groupSettingUpdate(from, 'not_announcement')
reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
} else {
reply(`Kirim perintah #${command} _options_\nOptions : close & open\nContoh : #${command} close`)
}
break
case 'kick':
if (!isGroup) return reply(mess.OnlyGroup)
if (!isGroupAdmins) return reply(mess.GrupAdmin)
if (!isBotGroupAdmins) return reply(mess.BotAdmin)
var number;
if (mentionUser.length !== 0) {
number = mentionUser[0]
ramz.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else if (isQuotedMsg) {
number = quotedMsg.sender
ramz.groupParticipantsUpdate(from, [number], "remove")
.then( res => 
reply(`*Sukses mengeluarkan member..!*`))
.catch((err) => reply(mess.error.api))
} else {
reply(`Tag atau balas pesan orang yang ingin dikeluarkan dari grup`)
}
break
case 'block':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Block\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await ramz.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "block") // Block user
reply('Sukses Block Nomor')
}
break
case 'unblock':{
if (!isOwner && !fromMe) return reply(mess.OnlyOwner)
if (!q) return reply(`Ex : ${prefix+command} Nomor Yang Ingin Di Unblock\n\nContoh :\n${prefix+command} 628xxxx`)
let nomorNya = q
await ramz.updateBlockStatus(`${nomorNya}@s.whatsapp.net`, "unblock")
reply('Sukses Unblock Nomor')
}
break
case 'shop':
case 'list':
  if (!isGroup) {
    return reply(mess.OnlyGrup);
  }
  if (db_respon_list.length === 0) {
    return reply(`Belum ada list message di database`);
  }
  if (!isAlreadyResponListGroup(from, db_respon_list)) {
    return reply(`Belum ada list message yang terdaftar di group ini`);
  }
  var arr_rows = [];
  for (let x of db_respon_list) {
    if (x.id === from) {
      arr_rows.push({
        title: x.key,
        rowId: x.key
      });
    }
  }
  let tekny = `Hai @${sender.split("@")[0]}\nBerikut list item yang tersedia di group ini!\n\nSilahkan ketik nama produk yang diinginkan!\n\n`;
  for (let i of arr_rows) {
    tekny += `Produk : ${i.title}\n\n`;
  }
  var listMsg = {
    text: tekny,
  };
  ramz.sendMessage(from, listMsg);
  break;
case 'addlist':
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (!q.includes("@")) return reply(`Gunakan dengan cara ${command} *key@response*\n\n_Contoh_\n\n#${command} tes@apa\n\nAtau kalian bisa Reply/Kasih Image dengan caption: #${command} tes@apa`)
if (isImage || isQuotedImage) {
if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
let media = await downloadAndSaveMediaMessage('image', `./sticker/${sender.split('@')[0]}.jpg`)
let url = await TelegraPh(media)
addResponList(from, args1, args2, true, url, db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
} else {
	if (isAlreadyResponList(from, args1, db_respon_list)) return reply(`List respon dengan key : *${args1}* sudah ada di group ini.`)
	addResponList(from, args1, args2, false, '-', db_respon_list)
reply(`Berhasil menambah List menu : *${args1}*`)
}
break
case 'dellist':{
if (!isGroup) return reply(mess.OnlyGrup)
if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
if (db_respon_list.length === 0) return reply(`Belum ada list message di database`)
var arr_rows = [];
for (let x of db_respon_list) {
if (x.id === from) {
arr_rows.push({
title: x.key,
rowId: `#hapuslist ${x.key}`
})
}
}
let tekny = `Hai @${sender.split("@")[0]}\nSilahkan Hapus list dengan Mengetik #hapuslist Nama list\n\nContoh: #hapuslist Tes\n\n`;
  for (let i of arr_rows) {
    tekny += `List : ${i.title}\n\n`;
  }
var listMsg = {
    text: tekny,
  };
ramz.sendMessage(from, listMsg)
}
break
case 'hapuslist':
delResponList(from, q, db_respon_list)
reply(`Sukses delete list message dengan key *${q}*`)
break
case 'testi':{
if (isGroup) return reply(mess.OnlyPM)
if (db_respon_testi.length === 0) return reply(`Belum ada list testi di database`)
var teks = `Hi @${sender.split("@")[0]}\nBerikut list testi\n\n`
for (let x of db_respon_testi) {
teks += `*LIST TESTI:* ${x.key}\n\n`
}
teks += `_Ingin melihat listnya?_\n_Ketik List Testi yang ada di atss_`
var listMsg = {
text: teks,
mentions: [sender]
}
ramz.sendMessage(from, listMsg, { quoted: msg })
}
break
case 'addtesti':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (isImage || isQuotedImage) {
if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} testi1@testimoni sc bot`)
if (isAlreadyResponTesti(args1, db_respon_testi)) return reply(`List respon dengan key : *${args1}* sudah ada.`)
let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender}`)
let tphurl = await TelegraPh(media)
addResponTesti(args1, args2, true, tphurl, db_respon_testi)
reply(`Berhasil menambah List testi *${args1}*`)
if (fs.existsSync(media)) return fs.unlinkSync(media)
} else {
	reply(`Kirim gambar dengan caption ${prefix+command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix+command} *key@response*`)
	}
break
case 'deltesti':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
if (db_respon_testi.length === 0) return reply(`Belum ada list testi di database`)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} testi1`)
if (!isAlreadyResponTesti(q, db_respon_testi)) return reply(`List testi dengan key *${q}* tidak ada di database!`)
delResponTesti(q, db_respon_testi)
reply(`Sukses delete list testi dengan key *${q}*`)
break
case 'listproduk': case 'produk':{
if (isGroup) return reply(mess.OnlyPM)
if (db_respon_produk.length === 0) return reply(`Belum ada list produk di database`)
var teks = `Hi @${sender.split("@")[0]}\nBerikut list produk\n\n`
for (let x of db_respon_produk) {
teks += `*LIST PRODUK:* ${x.key}\n\n`
}
teks += `_Ingin melihat listnya?_\n_Ketik List Produk yang ada di atss_`
var listMsg = {
text: teks,
mentions: [sender]
}
ramz.sendMessage(from, listMsg, { quoted: msg })
}
break
case 'addproduk':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
var args1 = q.split("@")[0]
var args2 = q.split("@")[1]
if (isImage || isQuotedImage) {
if (!q.includes("@")) return reply(`Gunakan dengan cara ${prefix+command} *key@response*\n\n_Contoh_\n\n${prefix+command} diamond_ml@list mu`)
if (isAlreadyResponProduk(args1, db_respon_produk)) return reply(`List respon dengan key : *${args1}* sudah ada.`)
let media = await downloadAndSaveMediaMessage('image', `./gambar/${sender}`)
let tphurl = await TelegraPh(media)
addResponProduk(args1, args2, true, tphurl, db_respon_produk)
reply(`Berhasil menambah List Produk *${args1}*`)
if (fs.existsSync(media)) return fs.unlinkSync(media)
} else {
	reply(`Kirim gambar dengan caption ${prefix+command} *key@response* atau reply gambar yang sudah ada dengan caption ${prefix+command} *key@response*`)
	}
break
case 'delproduk':
if (isGroup) return reply(mess.OnlyPM)
if (!isOwner) return reply(mess.OnlyOwner)
if (db_respon_produk.length === 0) return reply(`Belum ada list produk di database`)
if (!q) return reply(`Gunakan dengan cara ${prefix+command} *key*\n\n_Contoh_\n\n${prefix+command} diamond_ml`)
if (!isAlreadyResponProduk(q, db_respon_produk)) return reply(`List testi dengan key *${q}* tidak ada di database!`)
delResponProduk(q, db_respon_produk)
reply(`Sukses delete list testi dengan key *${q}*`)
break
case 'buynokos': {
		if (isGroup) return reply(mess.OnlyPM)
		if (cekUser("id", sender) == null) return ramz.sendMessage(from, { text: mess.OnlyUser, mentions: [global.ownerNumber, sender]}, { quoted: fkontak })
		if (cekSaldo(sender, db_saldo) == 0) return reply(`Yahh Saldo Kamu Kurang nih kak Untuk Membeli Nokos\n\nSilahkan Ketik *#deposit* Untuk Menambah-kan Saldo Anda😊`)
  if (!q) return reply(`Masukan Id service\nUntuk mengecek service id, bisa ketik #getservice`)
  let hal = 'https://otpku.com/api/json.php?api_key=' + apikeyOtpKu + '&action=services&country='
	var cekhar = await fetchJson(hal)
  let x = false
  Object.keys(cekhar.data).forEach((i) => {
    if (cekhar.data[i].id == q){x = i}
  })
  const pricee = cekhar.data[x].price
  if (cekSaldo(sender, db_saldo) < pricee && cekSaldo(sender, db_saldo) !== 0) return reply(`Yahh Saldo Kamu Kurang nih kak Untuk Membeli nokos dengan harga Rp${pricee}\n\nSilahkan Ketik *#deposit* Untuk Menambah-kan Saldo Anda😊`)
const axios = require("axios");
  var config = {
    method: 'POST',
    url: 'https://otpku.com/api/json.php?api_key=' + apikeyOtpKu + '&action=order&service=' + q + '&operator=any'
    }
axios(config)
    .then(function (response) {
    	if (response.data.status == false) return reply(JSON.stringify(response.data.data.msg, null, '\t'));
    if (response.data.status == true) {
reply(`───「  *CREATE NUMBER*  」────
    
    *ID:* ${response.data.data.id}
    *NUMBER:* ${response.data.data.number}
    *OPERATOR:* ${response.data.data.operator}
    *SERVICE ID:* ${response.data.data.service_id}
    *SERVICE NAME:* ${response.data.data.service_name}
    *HARGA:* Rp${pricee}
    
 !Nomor di atas Terblokir? atau Terlena masalah? silahkan Ketik #cansel
    
ℹ️Untuk Mengecek SmS bisa Ketik #getstatus ${response.data.data.id}
ℹ️Untuk jikalau sms blom masuk atau tidak berfungsi, bisa ketik #resend ${response.data.data.id}`)
    ramz.sendMessage(`${global.ownerNumber}`, {text: `───「  *ORDERAN*  」────
    
    *ID:* ${response.data.data.id}
    *NUMBER:* ${response.data.data.number}
    *OPERATOR:* ${response.data.data.operator}
    *SERVICE ID:* ${response.data.data.service_id}
    *SERVICE NAME:* ${response.data.data.service_name}
    *HARGA:* Rp${pricee}`}, {quoted: msg})
    minSaldo(sender, Number(pricee), db_saldo)
if (cekUser("premium", from) == true) return 
setUser("±premium", from, true)
   }
  })
  .catch(function (error) {
      // Penanganan kesalahan jika ada
      console.error('Error:', error);
      reply(JSON.stringify(error, null, '\t'));
    });
}
  break
  case 'getstatus': {
  	if (isGroup) return reply(mess.OnlyPM)
  	if (cekUser("id", sender) == null) return ramz.sendMessage(from, { text: mess.OnlyUser, mentions: [global.ownerNumber, sender]}, { quoted: fkontak })
  if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
  if (!q) return reply(`Masukan Id pesanan anda\nLIHAT ID PESANAN, BISA CEK TEXT CREATE NUMBER`)
const axios = require("axios");
  var config = {
    method: 'GET',
    url: 'https://otpku.com/api/json.php?api_key=' + apikeyOtpKu + '&action=status&id=' + q
    }
axios(config)
    .then(function (response) {
    	if (response.data.status == false) return reply(JSON.stringify(response.data.data.msg, null, '\t'));
    if (response.data.status == true) {
reply(`───「  *STATUS*  」────
    
    *ID:* ${response.data.data.id}
    *NUMBER:* ${response.data.data.number}
    *STATUS:* ${response.data.data.status}
    *SMS:* ${response.data.data.sms}
    *SERVICE NAME:* ${response.data.data.service_name}

ℹ️Jikalau sudah 5menit lebih, otp/sms belum.masuk, Silahkan cansel produk, dengan ketik #cansel`)
    }
  })
  .catch(function (error) {
      // Penanganan kesalahan jika ada
      console.error('Error:', error);
      reply(JSON.stringify(error, null, '\t'));
    });
}
  break
  case 'cansel': {
  if (isGroup) return reply(mess.OnlyPM)
  	if (cekUser("id", sender) == null) return ramz.sendMessage(from, { text: mess.OnlyUser, mentions: [global.ownerNumber, sender]}, { quoted: fkontak })
  if (!q) return reply(`Masukan Id pesanan anda\n_ℹ️LIHAT ID PESANAN, BISA CEK TEXT CREATE NUMBER_`)
const axios = require("axios");
  let link = 'https://otpku.com/api/json.php?api_key=' + apikeyOtpKu + '&action=services&country='
var cekser = await fetchJson(link)
let x = false
  var config = {
    method: 'GET',
    url: 'https://otpku.com/api/json.php?api_key=' + apikeyOtpKu + '&action=set_status&id=' + q + '&status=2'
    }
axios(config)
    .then(function (response) {
    	if (response.data.status == false) return reply(`───「  *CANSEL STATUS*  」────

    *PESAN:* ${response.data.msg}
    *ID:* ${response.data.data.id}
    *SERVICE NAME:* ${response.data.data.service_name}`)
    if (response.data.status == true) {
    ramz.sendMessage(from, {text: `───「  *CANSEL STATUS*  」────

    *PESAN:* ${response.data.msg}
    *ID:* ${response.data.data.id}
    *SERVICE NAME:* ${response.data.data.service_name}

Mohon Kembalikan Saldo user dengan #addsaldo
Untuk cek Harga layanan yang di cansel, bisa Cek pesan Create number sebelumnya`}, {quoted: msg})
  
  Object.keys(cekser.data).forEach((i) => {
    if (cekser.data[i].name == response.data.data.service_name){x = i}
  })
  const priceee = cekser.data[x].price
  addSaldo(sender, Number(priceee), db_saldo)
    }
  })
  .catch(function (error) {
      // Penanganan kesalahan jika ada
      console.error('Error:', error);
      reply(JSON.stringify(error, null, '\t'));
    });
}
  break
  case 'sendsms': {
  	if (isGroup) return reply(mess.OnlyPM)
  	if (cekUser("id", sender) == null) return ramz.sendMessage(from, { text: mess.OnlyUser, mentions: [global.ownerNumber, sender]}, { quoted: fkontak })
  if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
  if (!q) return reply(`Masukan Id pesanan anda\nLIHAT ID PESANAN, BISA CEK TEXT CREATE NUMBER`)
const axios = require("axios");
  var config = {
    method: 'GET',
    url: 'https://otpku.com/api/json.php?api_key=' + apikeyOtpKu + '&action=set_status&id=' + q + '&status=1'
    }
axios(config)
    .then(function (response) {
    	if (response.data.status == false) return reply(`───「  *SMS STATUS*  」────

    *PESAN:* ${response.data.msg}
    *ID:* ${response.data.data.id}
    *SERVICE NAME:* ${response.data.data.service_name}

Silahkan ketik #resend Untuk mengirim ulang sms`)
    if (response.data.status == true) {
reply(`───「  *SMS STATUS*  」────

    *PESAN:* ${response.data.msg}
    *ID:* ${response.data.data.id}
    *SERVICE NAME:* ${response.data.data.service_name}

_Silahkan gunakan kata command #getstatus untuk mengecek sms, Jikalau sms masih blom bisa, silahkan ketik #resend_`)
    }
  })
  .catch(function (error) {
      // Penanganan kesalahan jika ada
      console.error('Error:', error);
      reply(JSON.stringify(error, null, '\t'));
    });
}
  break
  case 'resend': {
  	if (isGroup) return reply(mess.OnlyPM)
  	if (cekUser("id", sender) == null) return ramz.sendMessage(from, { text: mess.OnlyUser, mentions: [global.ownerNumber, sender]}, { quoted: fkontak })
  if (cekUser("premium", sender) == false) return reply(mess.OnlyPrem)
  if (!q) return reply(`Masukan Id pesanan anda\nLIHAT ID PESANAN, BISA CEK TEXT CREATE NUMBER`)
const axios = require("axios");
  var config = {
    method: 'GET',
    url: 'https://otpku.com/api/json.php?api_key=' + apikeyOtpKu + '&action=set_status&id=' + q + '&status=3'
    }
axios(config)
    .then(function (response) {
    	if (response.data.status == false) return reply(`───「  *MENGUBAH SMS OTP*  」────

    *PESAN:* ${response.data.msg}
    *ID:* ${response.data.data.id}
    *SERVICE NAME:* ${response.data.data.service_name}

Silahkan tunggu beberapa saat, dan coba lagi`)
    if (response.data.status == true) {
reply(`───「  *MENGUBAH SMS OTP*  」────

    *PESAN:* ${response.data.msg}
    *ID:* ${response.data.data.id}
    *SERVICE NAME:* ${response.data.data.service_name}

Silahkan ketik #getstatus untuk cek sms otp`)
    }
  })
  .catch(function (error) {
      // Penanganan kesalahan jika ada
      console.error('Error:', error);
      reply(JSON.stringify(error, null, '\t'));
    });
}
  break

  case 'getservice': {
	if (isGroup) return reply(mess.OnlyPM)
  	if (cekUser("id", sender) == null) return ramz.sendMessage(from, { text: mess.OnlyUser, mentions: [global.ownerNumber, sender]}, { quoted: fkontak })
	if (!q) return reply(`Masukan nama negara nya\nDengan contoh: #${command} indo\n\n_Untuk mengcek negara yang tersedia bisa ketik #negara`)
	let linkk = 'https://otpku.com/api/json.php?api_key=' + apikeyOtpKu + '&action=services&country=' + q
  var config = await fetchJson(linkk)
  let teks = `*🍁BERIKUT LIST SERVICE YG TERSEDIA*\n\n`
  try {
  	if (config.data.status == false) return reply(`*ADA YANG KURANG COCOK*\n_Anda bisa melaporkan ke owner bot_`)
  for (let r of config.data) {
    teks += `*•ID:* ${r.id}\n*•Apk:* ${r.name}\n*•Harga:* Rp ${r.price}\n*•Tersedia:* ${r.tersedia}\n-----------------------------\n\n`
    }
    reply(teks)
  } catch (error) {
    console.error('Error:', error);
    reply(JSON.stringify(error, null, '\t'));
  }
}
  break;
  case 'negara':
  reply(`*--BERIKUT NEGARA YANG TERSEDIA--*
  
›  Indonesia
›  indo
›  malay
›  malaysia
›  russia
›  usa      `)
break
case 'cekapk': {
  if (isGroup) return reply(mess.OnlyPM)
  	if (cekUser("id", sender) == null) return ramz.sendMessage(from, { text: mess.OnlyUser, mentions: [global.ownerNumber, sender]}, { quoted: fkontak })
  let s = q.split('|')
  let a = s[0]
let n = s[1]
if (!a) return reply(`Gunakan kata command: ${prefix+command} Apk|Negara\nContoh: ${prefix+command} Whatsapp|Indonesia\n\n_Untuk Isian Apk, Mohon gunakan huruf besar di awal, seterusnya harus huruf kecil_\n\nUntuk cek negara yang tersedia ketik #negara`)
if (!n) return reply(`Gunakan kata command: ${prefix+command} Apk|Negara\nContoh: ${prefix+command} Whatsapp|Indonesia\n\n_Untuk Isian Apk, Mohon gunakan huruf besar di awal, seterusnya harus huruf kecil_\n\nUntuk cek negara yang tersedia ketik #negara`)
let linkkk = 'https://otpku.com/api/json.php?api_key=' + apikeyOtpKu + '&action=services&country=' + n
  var config = await fetchJson(linkkk)
try {
if (config.data.status == false) return reply(`Layanan Tidak tersedia`)
  let x = false
  Object.keys(config.data).forEach((i) => {
    if (config.data[i].name == a){x = i}
  })
  reply(`*🍁BERIKUT LIST LAYANAN ${q.toUpperCase()}*\n*•ID:* ${config.data[x].id}\n*•Apk:* ${config.data[x].name}\n*•Harga:* Rp ${config.data[x].price}\n*•Tersedia:* ${config.data[x].tersedia}`)
} catch (error) {
    console.error('Error:', error);
    reply(JSON.stringify(error, null, '\t') + `\n\n_Silahkan Lapor Ke Owner jikalau ada masalah, ketik #owner untuk melaporkan_`);
  }
}
break;
default:
if ((budy) && ["assalamu'alaikum", "Assalamu'alaikum", "Assalamualaikum", "assalamualaikum", "Assalammualaikum", "assalammualaikum", "Asalamualaikum", "asalamualaikum", "Asalamu'alaikum", " asalamu'alaikum"].includes(budy) && !isCmd) {
ramz.sendMessage(from, { text: `${pickRandom(["Wa'alaikumussalam","Wa'alaikumussalam Wb.","Wa'alaikumussalam Wr. Wb.","Wa'alaikumussalam Warahmatullahi Wabarakatuh"])}`})
}
if ((budy) && ["tes", "Tes", "TES", "Test", "test", "ping", "Ping"].includes(budy) && !isCmd) {
ramz.sendMessage(from, { text: `${runtime(process.uptime())}*⏰`})
}

}} catch (err) {
console.log(color('[ERROR]', 'red'), err)
const isGroup = msg.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const moment = require("moment-timezone");
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
let kon_erorr = {"tanggal": tanggal, "jam": jam, "error": err, "user": sender}
db_error.push(kon_erorr)
fs.writeFileSync('./database/error.json', JSON.stringify(db_error))
var errny =`*SERVER ERROR*
*Dari:* @${sender.split("@")[0]}
*Jam:* ${jam}
*Tanggal:* ${tanggal}
*Tercatat:* ${db_error.length}
*Type:* ${err}`
ramz.sendMessage(`${global.ownerNumber}`, {text:errny, mentions:[sender]})
}}
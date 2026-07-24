require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
    REST,
    Routes
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

// ===========================
// الإعدادات
// ===========================

const WELCOME_CHANNEL_ID = "1529144229396353174";
const RULES_CHANNEL_ID = "1529144219996786888";

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const ALLOWED_ROLE_ID = "1529144144096919623";

const KICK_ROLE_ID = "1529144169354891435";
const TIKTOK_ROLE_ID = "1529144170416177172";

const SERVER_ONLINE = true;

const LOGO =
'https://i.postimg.cc/52bVX0q7/file-00000000fe6481f48e9f144015c26941.png';

const commands = [
new SlashCommandBuilder()
.setName("roles")
.setDescription("Send notification roles panel")
.toJSON()
];

new SlashCommandBuilder()
    .setName('links')
    .setDescription('ارسال جميع روابط Elsisy Community')

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
try {
await rest.put(
Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
{ body: commands }
);

console.log("Slash Commands Loaded.");
} catch (err) {
console.log(err);
}
})();

//==============================

client.once("ready", () => {
console.log(`${client.user.tag} Ready`);
});

//==============================

client.on("interactionCreate", async interaction => {

if (interaction.isChatInputCommand()) {

if (interaction.commandName !== "roles") return;

if (!interaction.member.roles.cache.has(ALLOWED_ROLE_ID))
return interaction.reply({
content: "❌ ليس لديك صلاحية.",
ephemeral: true
});

const embed = new EmbedBuilder()

.setColor("#2b2d31")

.setTitle("🔔 Notification Roles")

.setDescription(`**
اختر الإشعارات التي تريد استلامها.

اضغط مرة لإضافة الرول
اضغط مرة أخرى لإزالة الرول

اختر الإشعارات التي تريد استلامها بالضغط على الزر المناسب.

<:Kick:1529200674783629433> **لـ مـتـابـعـة اشـعـارات بـثـوث Kick اضغط على زر Kick**

<:TikTok:1529200599298740295> **لـ مـتـابـعـة اشـعـارات الـ TikTok اضغط على زر TikTok**

**`);



const row = new ActionRowBuilder()

.addComponents(

new ButtonBuilder()


.setCustomId("kick")

.setLabel("Kick")

.setEmoji("<:Kick:1521307199056379934>")

.setStyle(ButtonStyle.Success),

new ButtonBuilder()

.setCustomId("tiktok")

.setLabel("TikTok")

.setEmoji("<:TikTok:1521307515168624720>")

.setStyle(ButtonStyle.Secondary),

);

const linksEmbed = new EmbedBuilder()
    .setColor('#ffcc00')
    .setTitle('🔗 Elsisy Community | Official Links')
    .setDescription(`
# 🌐 جميع روابط Elsisy Community

مرحبًا بك في الصفحة الرسمية الخاصة بروابط مجتمع **Elsisy**.

يمكنك من خلال الأزرار الموجودة بالأسفل الوصول إلى جميع صفحاتنا الرسمية بكل سهولة.

━━━━━━━━━━━━━━━━━━━━━━━

> 📢 تابعنا أولاً بأول لمعرفة آخر الأخبار والإعلانات والبثوث المباشرة والمحتوى الحصري.

━━━━━━━━━━━━━━━━━━━━━━━

**شكراً لدعمكم ❤️**
`)
    .setImage(banner)
    .setFooter({
        text: 'Elsisy Community • Official Links'
    });

const buttons = new ActionRowBuilder().addComponents(

    new ButtonBuilder()
        .setLabel('WhatsApp')
        .setEmoji('💬')
        .setStyle(ButtonStyle.Link)
        .setURL('https://ضع_رابط_الواتساب'),

    new ButtonBuilder()
        .setLabel('Kick')
        .setEmoji('🎥')
        .setStyle(ButtonStyle.Link)
        .setURL('https://kick.com/اسم_الحساب'),

    new ButtonBuilder()
        .setLabel('TikTok')
        .setEmoji('🎵')
        .setStyle(ButtonStyle.Link)
        .setURL('https://www.tiktok.com/@اسم_الحساب')
);

return interaction.reply({
embeds: [embed],
components: [row]
});

}

//==============================
// Buttons
//==============================

if (interaction.isButton()) {

let roleId;

if (interaction.customId === "kick")
roleId = KICK_ROLE_ID;

if (interaction.customId === "tiktok")
roleId = TIKTOK_ROLE_ID;

if (!roleId) return;

const member = interaction.member;

if (member.roles.cache.has(roleId)) {

await member.roles.remove(roleId);

return interaction.reply({
content: "❌ تم إزالة الرول.",
ephemeral: true
});

} else {

await member.roles.add(roleId);

return interaction.reply({
content: "✅ تم إعطاؤك الرول.",
ephemeral: true
});

}

}

});

// ===========================
// دخول عضو جديد
// ===========================

client.on("guildMemberAdd", async (member) => {

    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (!channel) return;

    const embed = new EmbedBuilder()
    .setColor("#573400")
    .setTitle("🎉 أهلاً بك في Elsisy Communtity")

    .setDescription(`💙 أهلاً وسهلاً بك يا ${member}`)

    .addFields(
        {
            name: "👤 معلومات عضويتك",
            value:
`📝 **الاسم**
\`${member.user.username}\`

🆔 **ID**
\`${member.user.id}\`

📅 **تاريخ الدخول**
<t:${Math.floor(Date.now() / 1000)}:F>`,
            inline: false
        },
        {
            name: "📋 القوانين المهمة",
            value:
`✅ اقرأ جميع القوانين قبل البدء
✅ احترم جميع الأعضاء
✅ لا تشارك محتوى مزعج
🎉 استمتع بالمجتمع`,
            inline: false
        }
    )

    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

    .setImage("https://i.postimg.cc/XNdm9Wvw/file-00000000fac881f4bf8abe24be69b5d2.png")

    .setFooter({
        text: "نتمني لك وقتا رائعا معنا | Elsisy Community",
        iconURL: "https://i.postimg.cc/52bVX0q7/file-00000000fe6481f48e9f144015c26941.png"
    })

    .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("rules_button")
            .setLabel("📖 قراءة القوانين")
            .setStyle(ButtonStyle.Secondary)
    );

    channel.send({
        content: `${member}`,
        embeds: [embed],
        components: [row]
    });

});

// ===========================
// زر القوانين
// ===========================

client.on("interactionCreate", async (interaction) => {

    if (!interaction.isButton()) return;

    if (interaction.customId === "rules_button") {

        await interaction.reply({
            content: `📜 توجه إلى روم القوانين: <#${RULES_CHANNEL_ID}>`,
            ephemeral: true
        });

    }

});

client.once('clientReady', async () => {

    console.log(`${client.user.tag} Online`);

    const channel = await client.channels.fetch(CHANNEL_ID);

    async function updatePanel() {

        try {

            // =====================================
            // السيرفر
            // =====================================

            const guild = await client.guilds.fetch(GUILD_ID);

            await guild.members.fetch();

            // =====================================
            // عدد الاونلاين
            // =====================================

            const onlineMembers = guild.members.cache.filter(
    member =>
        member.presence &&
        member.presence.status !== 'offline'
).size;

            // =====================================
            // عدد الاعضاء
            // =====================================

            const totalMembers = guild.memberCount;


            // =====================================
            // الحالة
            // =====================================

            const statusText = SERVER_ONLINE
                ? '🟢 Online '
                : '🔴 Offline';


            // =====================================
            // لون الـ Embed
            // =====================================

            const embedColor = SERVER_ONLINE
                ? '#573400'
                : '#ff0000';


            // =====================================
            // EMBED
            // =====================================

            const embed = new EmbedBuilder()

            .setColor(embedColor)

            .setAuthor({
                name: 'Elsusy Server States',
                iconURL: LOGO
            })

            .setTitle(' 𝐄𝐥𝐬𝐢𝐬𝐲 𝐂𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲 ')

            .setThumbnail(LOGO)

            .addFields(

                {
                    name: 'حالة السيرفر',
                    value: `\`\`\`${statusText}\`\`\``,
                    inline: true
                },

                {
                    name: 'الأعضاء المتصلين 👥',
                    value: `\`\`\`${onlineMembers} / ${totalMembers}\`\`\``,
                    inline: true
                },

                {
                    name: 'دخول السيرفر 🌍',
                    value: `\`\`\`https://discord.gg/BN6naaXJG\`\`\``,
                    inline: false
                }

            )

            .setImage('https://i.postimg.cc/XNdm9Wvw/file-00000000fac881f4bf8abe24be69b5d2.png')

            .setFooter({
                text: 'Updated every minute'
            })

            .setTimestamp();


            // =====================================
            // الأزرار
            // =====================================

            const row = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                .setLabel('💬 دخول السيرفر')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/dZUqZ9sxz')
            );


            // =====================================
            // تعديل الرسالة
            // =====================================

            const messages = await channel.messages.fetch({
                limit: 10
            });

            const oldMessage = messages.find(
                m => m.author.id === client.user.id
            );

            if (oldMessage) {

                await oldMessage.edit({
                    embeds: [embed],
                    components: [row]
                });

            } else {

                await channel.send({
                    embeds: [embed],
                    components: [row]
                });

            }

        } catch (err) {

            console.log(err);

        }

    }

    updatePanel();

    setInterval(updatePanel, 60000);

});

// ===========================
// تشغيل البوت
// ===========================

client.login(process.env.TOKEN);

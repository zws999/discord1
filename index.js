import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  Partials,
  Events,
  MessageFlags,
} from "discord.js";
import fs from "fs";
import path from "path";
import process from "process";
import setAvatar from "./avatar.js";

/* =========================================================
   303 Services/Shop - Production-ready bot (ESM)
   ========================================================= */

// ===================== TOKEN =====================
// Store your token in the DISCORD_TOKEN environment variable.
// Never hard-code tokens in source files.
const TOKEN = "MTQ1OTMzNTI2MjQxMTgyMTI1MA.GIGia3.RhxXgajH6Egf2snBgxckL0BldiZWH2uvXzXtO0";

// ===================== CLIENT =====================
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.GuildMember, Partials.Channel],
});

// ===================== CONFIG =====================
const SERVER_NAME = "303 Services/Shop";
const GUILD_ID = "1459322810232209461";

const ADMIN_ROLE_ID = "1459323046941954098";
const SUPPORT_CLAIM_ROLE_ID = "1459323032785916047";
const BUY_ROLE_ID = "1459323046941954098";

const STAFF_APP_ACCESS_ROLE_IDS = [
  "1403250153259012106",
  "1459323039706513573",
  "1459323117926223893",
];
const STAFF_APP_CLAIM_ROLE_IDS = [
  "1459323117926223893",
  "1459323039706513573",
  "1459323046941954098",
];

const STAFF_ID = "1459323097424597155";
const VIEW_PARTICIPANTS_ROLE_ID = "1459323094312157224";

const WELCOME_CHANNEL_NAME = "🖐┊welcome";
const GOODBYE_CHANNEL_NAME = "🖐┊goodbye";

const LEVEL_CHANNEL_ID = "1459323380523073608";
const LEVEL_FILE = path.resolve("./levels.json");

const BENEFITS_CHANNEL_ID = "1459379864133173479";
const VERIFICATION_CHANNEL_ID = "1459380717149749512";
const BENEFITS_EMOJI = "⭐";

const WEBSITE_CHANNEL_NAME = "🌐┊website";
const WEBSITE_URL = "https://303shop.vercel.app/";

const DONATOR_CHANNEL_ID = "1462513087885086761";
const DONATOR_URL = "https://zws999.github.io/website1/";

const SUPPORT_INFO_CHANNEL_ID = "1459323310029406218";
const BACKUP_SERVER_CHANNEL_ID = "1459323301259382847";
const STAFF_RULES_CHANNEL_ID = "1459323397661003819";
const PAYMENT_OPTIONS_CHANNEL_ID = "1459323451822309553";
const TOS_CHANNEL_ID = "1459323444280954921";
const STAFF_QS_CHANNEL_ID = "1459323405710131212";
const SOCIAL_MEDIA_CHANNEL_ID = "1459323293910831200";

const LANG_STICKY_CHANNEL_ID = "1459323372793102346";
const LANG_GIF_URL =
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMm5nbGF4MzNlMTVkNmxvNG9xdWZpbGpsd2FpNDVuemM3ODRyNTgxciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0j029r8MEaDuccxGDX/giphy.gif";

const DROP_CHANNEL_ID = "1459323364501094511";
const ANNOUNCE_CHANNEL_ID = "1459853053737046129";

const HELP_CHANNEL_ID = "1483832258598142193";

const AUTO_ROLE_ID = "1459322974405656648";
const BOT_ROLE_ID = "1459323043196440637";
const INVITE_LOG_CHANNEL_ID = "1459323261421883436";
const BOOST_CHANNEL_ID = "1459323356812677201";

const bannerURL = "https://i.postimg.cc/j2N48hpb/image2.png";
const ticketGif = LANG_GIF_URL;

// ===================== TELEGRAM CONFIG =====================
const TELEGRAM_CHANNEL_ID = "1483899562857857034";
const TELEGRAM_URL = "https://t.me/serviices303";

// ===================== ECONOMY CONFIG =====================
const ECONOMY_FILE = path.resolve("./economy.json");
const LEADERBOARD_CHANNEL_ID = "1483865977497321638";
const COINFLIP_REQUEST_CHANNEL_ID = "1483865925336694804";
const GAMBLING_COMMANDS_CHANNEL_ID = "1483865925336694804";
const DAILY_COMMAND_CHANNEL_ID = "1483866226286395463";
const STARTING_COINS = 500;
const DAILY_BASE_REWARD = 250;
const DAILY_STREAK_BONUS = 35;
const DAILY_MAX_REWARD = 1000;
const JACKPOT_CHANCE = 0.05;
const RECHARGE_MAX_AMOUNT = 10000;

// ===================== HELPERS =====================
const uniq = (list) => Array.from(new Set((list || []).filter(Boolean)));
const now = () => Date.now();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function safeJsonRead(file, fallback = {}) {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function safeJsonWrite(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("[safeJsonWrite]", e);
  }
}

function truncate(str, max = 1900) {
  if (!str) return "";
  return str.length > max ? `${str.slice(0, max - 3)}...` : str;
}

function mentionUser(userId) {
  return `<@${userId}>`;
}

function mentionRole(roleId) {
  return `<@&${roleId}>`;
}

function mentionChannel(channelId) {
  return `<#${channelId}>`;
}

function hasRole(member, roleId) {
  return !!member?.roles?.cache?.has(roleId);
}

function hasAnyRole(member, roleIds) {
  return roleIds.some((id) => hasRole(member, id));
}

function formatNumber(num) {
  return Number(num || 0).toLocaleString("en-US");
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hoursBetween(a, b) {
  return Math.floor(Math.abs(a - b) / (1000 * 60 * 60));
}

// ===================== ECONOMY SYSTEM =====================
let economy = safeJsonRead(ECONOMY_FILE, {
  users: {},
  leaderboardMessageId: null,
});

const blackjackGames = new Map();
const pendingCoinflips = new Map();

function saveEconomy() {
  safeJsonWrite(ECONOMY_FILE, economy);
}

function ensureEconomyUser(userId) {
  if (!economy.users[userId]) {
    economy.users[userId] = {
      coins: STARTING_COINS,
      totalGamblingWon: 0,
      totalGamblingLost: 0,
      totalDailyClaims: 0,
      dailyStreak: 0,
      lastDailyAt: 0,
      stats: {
        coinflipPlayed: 0,
        dicePlayed: 0,
        slotsPlayed: 0,
        blackjackPlayed: 0,
        coinflipWon: 0,
        diceWon: 0,
        slotsWon: 0,
        blackjackWon: 0,
      },
    };
  }

  const u = economy.users[userId];
  if (typeof u.coins !== "number") u.coins = STARTING_COINS;
  if (typeof u.totalGamblingWon !== "number") u.totalGamblingWon = 0;
  if (typeof u.totalGamblingLost !== "number") u.totalGamblingLost = 0;
  if (typeof u.totalDailyClaims !== "number") u.totalDailyClaims = 0;
  if (typeof u.dailyStreak !== "number") u.dailyStreak = 0;
  if (typeof u.lastDailyAt !== "number") u.lastDailyAt = 0;
  if (!u.stats) {
    u.stats = {
      coinflipPlayed: 0,
      dicePlayed: 0,
      slotsPlayed: 0,
      blackjackPlayed: 0,
      coinflipWon: 0,
      diceWon: 0,
      slotsWon: 0,
      blackjackWon: 0,
    };
  }

  return u;
}

function getUserCoins(userId) {
  return ensureEconomyUser(userId).coins;
}

function addCoins(userId, amount) {
  const user = ensureEconomyUser(userId);
  user.coins += amount;
  if (user.coins < 0) user.coins = 0;
  saveEconomy();
  return user.coins;
}

function recordGambleWin(userId, amount, statKey) {
  const user = ensureEconomyUser(userId);
  user.totalGamblingWon += amount;
  if (statKey) {
    user.stats[`${statKey}Played`] = (user.stats[`${statKey}Played`] || 0) + 1;
    user.stats[`${statKey}Won`] = (user.stats[`${statKey}Won`] || 0) + 1;
  }
  saveEconomy();
}

function recordGambleLoss(userId, amount, statKey) {
  const user = ensureEconomyUser(userId);
  user.totalGamblingLost += amount;
  if (statKey) {
    user.stats[`${statKey}Played`] = (user.stats[`${statKey}Played`] || 0) + 1;
  }
  saveEconomy();
}

// FIX: added a recordGambleDraw helper for ties - increments played count without win/loss
function recordGambleDraw(userId, statKey) {
  const user = ensureEconomyUser(userId);
  if (statKey) {
    user.stats[`${statKey}Played`] = (user.stats[`${statKey}Played`] || 0) + 1;
  }
  saveEconomy();
}

function getTopUsersByCoins(limit = 10) {
  return Object.entries(economy.users)
    .map(([userId, data]) => ({ userId, value: data.coins || 0 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

function getTopUsersByDailyClaims(limit = 10) {
  return Object.entries(economy.users)
    .map(([userId, data]) => ({ userId, value: data.totalDailyClaims || 0 }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

function getTopUsersByGambling(limit = 10) {
  return Object.entries(economy.users)
    .map(([userId, data]) => ({
      userId,
      value: (data.totalGamblingWon || 0) - (data.totalGamblingLost || 0),
      won: data.totalGamblingWon || 0,
      lost: data.totalGamblingLost || 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

function canClaimDaily(userId) {
  const user = ensureEconomyUser(userId);
  const diff = now() - (user.lastDailyAt || 0);
  return diff >= 24 * 60 * 60 * 1000;
}

function getDailyRemainingMs(userId) {
  const user = ensureEconomyUser(userId);
  const diff = now() - (user.lastDailyAt || 0);
  const remaining = 24 * 60 * 60 * 1000 - diff;
  return Math.max(0, remaining);
}

function formatDuration(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

function claimDaily(userId) {
  const user = ensureEconomyUser(userId);
  const previous = user.lastDailyAt || 0;

  if (!canClaimDaily(userId)) {
    return { ok: false, remaining: getDailyRemainingMs(userId) };
  }

  if (previous > 0) {
    const diffHours = hoursBetween(now(), previous);
    if (diffHours >= 24 && diffHours <= 48) {
      user.dailyStreak += 1;
    } else {
      user.dailyStreak = 1;
    }
  } else {
    user.dailyStreak = 1;
  }

  const reward = clamp(
    DAILY_BASE_REWARD + (user.dailyStreak - 1) * DAILY_STREAK_BONUS,
    DAILY_BASE_REWARD,
    DAILY_MAX_REWARD
  );

  user.lastDailyAt = now();
  user.totalDailyClaims += 1;
  user.coins += reward;
  saveEconomy();

  return {
    ok: true,
    reward,
    streak: user.dailyStreak,
    totalClaims: user.totalDailyClaims,
    balance: user.coins,
  };
}

function createLeaderboardHomeEmbed() {
  return new EmbedBuilder()
    .setTitle("🏆 Economy Leaderboards")
    .setDescription(
      [
        "Choose a category from the dropdown below.",
        "",
        "🎰 **Gambling Leaderboard**",
        "See the richest gambling players and best gambling profit.",
        "",
        "📅 **Daily Leaderboard**",
        "See who used **/daily** the most times.",
      ].join("\n")
    )
    .setColor("#2b2d31")
    .setThumbnail(bannerURL)
    .setImage(ticketGif)
    .setFooter({ text: "303 Economy • Updates every 5 minutes" })
    .setTimestamp();
}

function createLeaderboardMenu() {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("economy_leaderboard_select")
      .setPlaceholder("📊 Choose leaderboard category")
      .addOptions([
        {
          label: "🎰 Gambling Leaderboard",
          value: "gambling",
          description: "Top gambling profit and balance",
          emoji: "🎰",
        },
        {
          label: "📅 Daily Leaderboard",
          value: "daily",
          description: "Top /daily usage count",
          emoji: "📅",
        },
      ])
  );
}

async function buildLeaderboardCategoryEmbed(category, guild) {
  if (category === "daily") {
    const top = getTopUsersByDailyClaims(10);
    const lines = [];

    for (let i = 0; i < top.length; i++) {
      const row = top[i];
      const member = await guild.members.fetch(row.userId).catch(() => null);
      const name = member?.user?.tag || `User ${row.userId}`;
      const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`;
      lines.push(`${medal} **${name}** - \`${formatNumber(row.value)}\` daily claims`);
    }

    return new EmbedBuilder()
      .setTitle("📅 Daily Leaderboard")
      .setDescription(lines.length ? lines.join("\n") : "No one has used **/daily** yet.")
      .setColor("#00b894")
      .setFooter({ text: "Only visible to you" })
      .setTimestamp();
  }

  const topProfit = getTopUsersByGambling(10);
  const topCoins = getTopUsersByCoins(10);

  const profitLines = [];
  for (let i = 0; i < topProfit.length; i++) {
    const row = topProfit[i];
    const member = await guild.members.fetch(row.userId).catch(() => null);
    const name = member?.user?.tag || `User ${row.userId}`;
    const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`;
    profitLines.push(`${medal} **${name}** - Net: \`${formatNumber(row.value)}\` coins`);
  }

  const balanceLines = [];
  for (let i = 0; i < topCoins.length; i++) {
    const row = topCoins[i];
    const member = await guild.members.fetch(row.userId).catch(() => null);
    const name = member?.user?.tag || `User ${row.userId}`;
    const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`;
    balanceLines.push(`${medal} **${name}** - Balance: \`${formatNumber(row.value)}\` coins`);
  }

  return new EmbedBuilder()
    .setTitle("🎰 Gambling Leaderboard")
    .setDescription(
      [
        "## 💰 Top Balances",
        balanceLines.length ? balanceLines.join("\n") : "No data yet.",
        "",
        "## 📈 Top Net Gambling Profit",
        profitLines.length ? profitLines.join("\n") : "No data yet.",
      ].join("\n")
    )
    .setColor("#f1c40f")
    .setFooter({ text: "Only visible to you" })
    .setTimestamp();
}

async function refreshPublicLeaderboardMessage() {
  const guild = client.guilds.cache.get(GUILD_ID) || client.guilds.cache.first();
  if (!guild) return;

  const channel = client.channels.cache.get(LEADERBOARD_CHANNEL_ID);
  if (!channel || !channel.isTextBased()) return;

  let message = null;
  if (economy.leaderboardMessageId) {
    message = await channel.messages.fetch(economy.leaderboardMessageId).catch(() => null);
  }

  const payload = {
    embeds: [createLeaderboardHomeEmbed()],
    components: [createLeaderboardMenu()],
  };

  if (message) {
    await message.edit(payload).catch((e) => {
      console.error("[refreshPublicLeaderboardMessage] edit failed:", e?.message);
    });
  } else {
    const sent = await channel.send(payload).catch((e) => {
      console.error("[refreshPublicLeaderboardMessage] send failed:", e?.message);
      return null;
    });
    if (sent) {
      economy.leaderboardMessageId = sent.id;
      saveEconomy();
    }
  }
}

// ===================== BLACKJACK =====================
function drawBlackjackCard() {
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  return ranks[Math.floor(Math.random() * ranks.length)];
}

function blackjackHandValue(cards) {
  let total = 0;
  let aces = 0;

  for (const card of cards) {
    if (card === "A") {
      aces++;
      total += 11;
    } else if (["K", "Q", "J"].includes(card)) {
      total += 10;
    } else {
      total += Number(card);
    }
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

function createBlackjackEmbed(user, game, revealDealer = false, resultText = null) {
  const dealerCardsText = revealDealer
    ? `${game.dealer.join(" ")} (**${blackjackHandValue(game.dealer)}**)`
    : `${game.dealer[0]} ❓`;

  const playerValue = blackjackHandValue(game.player);

  return new EmbedBuilder()
    .setTitle("🃏 Blackjack")
    .setColor("#2b2d31")
    .setThumbnail(user.displayAvatarURL({ forceStatic: false }))
    .addFields(
      { name: "👤 Your Hand", value: `${game.player.join(" ")} (**${playerValue}**)`, inline: false },
      { name: "🤖 Dealer Hand", value: dealerCardsText, inline: false },
      { name: "💸 Bet", value: `${formatNumber(game.bet)} coins`, inline: true },
      { name: "💰 Balance", value: `${formatNumber(getUserCoins(user.id))} coins`, inline: true }
    )
    .setFooter({ text: resultText || "Use the buttons below to play." })
    .setTimestamp();
}

// ===================== CLAIM SYSTEM =====================
const CLAIM_MARKER = "CLAIMED:";

function getClaimedUserIdFromTopic(topic) {
  if (!topic || typeof topic !== "string") return null;
  const m = topic.match(/(?:^|\s)CLAIMED:(\d{15,25})\b/);
  return m ? m[1] : null;
}

async function setChannelClaim(channel, userId) {
  const current = channel.topic || "";
  const cleaned = current.replace(/(?:^|\s)CLAIMED:\d{15,25}\b/, "").trim();
  const prefix = `${CLAIM_MARKER}${userId}`;
  const next = cleaned ? `${prefix} | ${cleaned}` : prefix;
  await channel.setTopic(next).catch(() => {});
}

async function clearChannelClaim(channel) {
  const current = channel.topic || "";
  const cleaned = current
    .replace(/(?:^|\s)CLAIMED:\d{15,25}\b/, "")
    .replace(/^\s*\|\s*/, "")
    .trim();
  await channel.setTopic(cleaned || null).catch(() => {});
}

// ===================== LEVEL SYSTEM =====================
let levels = safeJsonRead(LEVEL_FILE, {});

function saveLevels() {
  safeJsonWrite(LEVEL_FILE, levels);
}

function ensureUserLevel(userId) {
  if (!levels[userId]) levels[userId] = { text: 0, voice: 0 };
}

function getTextLevelInfo(messages) {
  let level = 1;
  let required = 150;
  while (messages >= required) {
    level++;
    required += 150 * level;
  }
  const prevRequired = required - 150 * level;
  const progress = messages - prevRequired;
  const toNext = required - messages;
  return { level: level - 1, progress, toNext, required: required - prevRequired };
}

function getVoiceLevelInfo(minutes) {
  let level = 1;
  let required = 600;
  while (minutes >= required) {
    level++;
    required += 600 * level;
  }
  const prevRequired = required - 600 * level;
  const progress = minutes - prevRequired;
  const toNext = required - minutes;
  return { level: level - 1, progress, toNext, required: required - prevRequired };
}

function createProgressBar(progress, total) {
  const ratio = total > 0 ? progress / total : 0;
  const filled = Math.max(0, Math.min(10, Math.round(ratio * 10)));
  return "🟩".repeat(filled) + "⬛".repeat(10 - filled);
}

async function checkLevelUp(userId, guild, type, newLevel) {
  const channel = guild.channels.cache.get(LEVEL_CHANNEL_ID);
  if (!channel || channel.type !== ChannelType.GuildText) return;
  const user = await client.users.fetch(userId).catch(() => null);
  if (!user) return;

  const embed = new EmbedBuilder()
    .setTitle("🎉 Level Up! 🚀")
    .setDescription(
      `🌟 **Congratulations, ${user.tag}!** 🎊\nYou've reached **${type} Level ${newLevel}**! 🏆\nKeep it up! 🔥💪`
    )
    .setColor("#FFD700")
    .setThumbnail(user.displayAvatarURL({ forceStatic: false }))
    .setImage(ticketGif)
    .addFields(
      { name: "🎖️ Achievement Unlocked", value: `You're now a ${type} master at level ${newLevel}! 🌈`, inline: false },
      { name: "🏅 Rewards", value: "Unlock special emojis, roles, or badges soon! 🎁", inline: false }
    )
    .setFooter({ text: "Powered by 303 Levels System ⭐" })
    .setTimestamp();

  await channel.send({ content: mentionUser(user.id), embeds: [embed] }).catch(() => {});
}

// ===================== INVITE TRACKING =====================
const guildInvites = new Map();
const inviteCounts = new Map();

async function cacheGuildInvites(guild) {
  try {
    const invites = await guild.invites.fetch();
    const map = new Map();
    invites.forEach((invite) => map.set(invite.code, invite.uses ?? 0));
    guildInvites.set(guild.id, map);
  } catch (e) {
    console.error("[cacheGuildInvites]", e?.message || e);
  }
}

async function handleInviteLogger(member) {
  const loggerChannel = client.channels.cache.get(INVITE_LOG_CHANNEL_ID);
  if (!loggerChannel || !loggerChannel.isTextBased()) return;

  try {
    const newInvites = await member.guild.invites.fetch();
    const previous = guildInvites.get(member.guild.id) || new Map();

    let inviter = null;
    let inviteCount = 0;

    for (const [code, invite] of newInvites) {
      const oldUses = previous.get(code) || 0;
      const newUses = invite.uses || 0;
      if (newUses > oldUses && invite.inviter) {
        inviter = invite.inviter;
        inviteCount = (inviteCounts.get(inviter.id) || 0) + 1;
        inviteCounts.set(inviter.id, inviteCount);
        break;
      }
    }

    await cacheGuildInvites(member.guild);
    if (!inviter) return;

    const embed = new EmbedBuilder()
      .setTitle("New member on 303 Services/Shop!")
      .setDescription(
        `${mentionUser(member.user.id)} just joined.\nThey were invited by **${mentionUser(
          inviter.id
        )}** who now has **${inviteCount} invites**!`
      )
      .setColor("#2b2d31")
      .setAuthor({
        name: `${member.user.tag} just joined`,
        iconURL: member.user.displayAvatarURL({ forceStatic: false }),
      })
      .setThumbnail(inviter.displayAvatarURL({ forceStatic: false, size: 512 }))
      .setTimestamp();

    await loggerChannel.send({ embeds: [embed] });
  } catch (e) {
    console.error("[handleInviteLogger]", e?.message || e);
  }
}

// ===================== ANTI-SPAM / COOLDOWNS =====================
const stickyRefreshCooldown = new Map();
const xpCooldowns = new Map();

function isOnCooldown(map, key, ms) {
  const last = map.get(key) || 0;
  if (now() - last < ms) return true;
  map.set(key, now());
  return false;
}

// ===================== GIVEAWAY =====================
const giveaways = new Map();

async function endGiveaway(messageId) {
  const giveaway = giveaways.get(messageId);
  if (!giveaway) return;

  const entrantsArray = Array.from(giveaway.entrants);
  if (entrantsArray.length === 0) {
    const endedEmbed = new EmbedBuilder()
      .setTitle(`🎉 Giveaway Ended: ${giveaway.prize}`)
      .setDescription(`${giveaway.description}\n\nNo entries, giveaway cancelled. 😔`)
      .setColor("#FF0000")
      .setTimestamp();
    await giveaway.message.edit({ embeds: [endedEmbed], components: [] }).catch(() => {});
  } else {
    const winnerId = entrantsArray[Math.floor(Math.random() * entrantsArray.length)];
    const winner = await client.users.fetch(winnerId).catch(() => null);

    const endedEmbed = new EmbedBuilder()
      .setTitle(`🎉 Giveaway Ended: ${giveaway.prize}`)
      .setDescription(
        `${giveaway.description}\n\n**Winner:** ${
          winner ? winner.toString() : "Unknown user"
        }\nEntries: ${giveaway.entrants.size}`
      )
      .setColor("#00FF00")
      .setTimestamp();

    await giveaway.message.edit({ embeds: [endedEmbed], components: [] }).catch(() => {});
    await giveaway.channel
      .send(
        `🎊 Congratulations ${winner ? winner.toString() : "the winner"}! You won **${giveaway.prize}**! Contact the host to claim.`
      )
      .catch(() => {});
  }

  giveaways.delete(messageId);
}

// ===================== DROP SYSTEM =====================
// FIX: dropActive is set immediately when the command runs, preventing concurrent drops.
let dropActive = false;
let dropWinner = null;

// ===================== POLL SYSTEM =====================
const polls = new Map();

// ===================== LANGUAGE STICKY =====================
function getLangText(lang) {
  const data = {
    English: [
      "⚠️ **ENGLISH ONLY**",
      "• This chat is exclusively for English communication. Using any other language may result in a timeout.",
      "",
      "🎫 **Need Support?**",
      "• Don't ask for help here! Please open a ticket in <#1459323428690727035> for assistance.",
      "",
      "You can change your language anytime using the menu below.",
    ],
    German: [
      "⚠️ **NUR ENGLISCH**",
      "• Dieser Chat ist ausschließlich für englische Kommunikation.",
      "",
      "🎫 **Brauchst du Hilfe?**",
      "• Bitte öffne ein Ticket in <#1459323428690727035>.",
      "",
      "Du kannst die Sprache jederzeit über das Menü unten ändern.",
    ],
    Romanian: [
      "⚠️ **DOAR ENGLEZĂ**",
      "• Acest chat este exclusiv pentru comunicare în engleză.",
      "",
      "🎫 **Ai nevoie de suport?**",
      "• Nu cere ajutor aici. Deschide un ticket în <#1459323428690727035>.",
      "",
      "Poți schimba limba oricând folosind meniul de mai jos.",
    ],
    Polish: [
      "⚠️ **TYLKO ANGIELSKI**",
      "• Ten chat jest przeznaczony wyłącznie do komunikacji po angielsku.",
      "",
      "🎫 **Potrzebujesz pomocy?**",
      "• Otwórz ticket w <#1459323428690727035>.",
      "",
      "Możesz zmienić język w dowolnym momencie, używając menu poniżej.",
    ],
    Portuguese: [
      "⚠️ **APENAS INGLÊS**",
      "• Este chat é exclusivo para comunicação em inglês.",
      "",
      "🎫 **Precisa de suporte?**",
      "• Não peça ajuda aqui. Abra um ticket em <#1459323428690727035>.",
      "",
      "Você pode alterar o idioma a qualquer momento usando o menu abaixo.",
    ],
  };
  return data[lang] || data.English;
}

function createLanguageEmbed(lang = "English") {
  return new EmbedBuilder()
    .setTitle("📌 Pinned Message")
    .setColor("#2b2d31")
    .setDescription(getLangText(lang).join("\n"))
    .setImage(LANG_GIF_URL);
}

function createLanguageMenu() {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("lang_sticky_select")
      .setPlaceholder("Select your language / Alege limba")
      .addOptions([
        { label: "English", value: "English", emoji: "🇬🇧" },
        { label: "Deutsch", value: "German", emoji: "🇩🇪" },
        { label: "Română", value: "Romanian", emoji: "🇷🇴" },
        { label: "Polski", value: "Polish", emoji: "🇵🇱" },
        { label: "Português", value: "Portuguese", emoji: "🇧🇷" },
      ])
  );
}

// ===================== CHANNEL PINNED / AUTO MESSAGES =====================
function buildChannelMessageConfig() {
  return [
    {
      key: "lang_sticky",
      channelId: LANG_STICKY_CHANNEL_ID,
      matcher: (m) =>
        m.embeds?.[0]?.title === "📌 Pinned Message" &&
        (m.components?.[0]?.components?.[0]?.customId === "lang_sticky_select" ||
          m.components?.[0]?.components?.[0]?.custom_id === "lang_sticky_select"),
      payload: () => ({
        embeds: [createLanguageEmbed("English")],
        components: [createLanguageMenu()],
      }),
    },
    {
      key: "website_promo",
      channelFinder: (guild) =>
        guild.channels.cache.find(
          (c) => c.name === WEBSITE_CHANNEL_NAME && c.type === ChannelType.GuildText
        ),
      matcher: (m) => m.embeds?.[0]?.title === "🌐 Our Official Shop!",
      payload: () => {
        const embed = new EmbedBuilder()
          .setTitle("🌐 Our Official Shop!")
          .setDescription(
            [
              "Visit our **official online store** to view products! 💥",
              "",
              "🧾 **Products**",
              "Browse the website to see all available items.",
              "",
              "🚚 **Delivery**",
              "After placing and completing your order, please open a ticket on the server and send your **Order ID**.",
              "",
              "Thank you for supporting us!",
            ].join("\n")
          )
          .setColor("#2b2d31")
          .setThumbnail(bannerURL)
          .setImage(ticketGif)
          .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setLabel("Visit Shop").setStyle(ButtonStyle.Link).setURL(WEBSITE_URL)
        );
        return { embeds: [embed], components: [row] };
      },
    },
    {
      key: "benefits",
      channelId: BENEFITS_CHANNEL_ID,
      matcher: (m) => m.embeds?.[0]?.title?.includes("Get customers benefits"),
      payload: () => {
        const embed = new EmbedBuilder()
          .setTitle(`${BENEFITS_EMOJI} Get customers benefits`)
          .setDescription(
            "Message the bot using the button below!\n\n" +
              "Use the **/vcustomer** command in DM and attach a photo of the ordered product given by the shop owner!\n\n" +
              "**Thank you for supporting us!**"
          )
          .setColor("#2b2d31")
          .setThumbnail(bannerURL)
          .setImage(ticketGif)
          .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("dm_bot_benefits")
            .setLabel("DM Bot")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("✉️")
        );
        return { embeds: [embed], components: [row] };
      },
    },
    {
      key: "donator",
      channelId: DONATOR_CHANNEL_ID,
      matcher: (m) => m.embeds?.[0]?.title?.includes("💎 Become a Donator!"),
      payload: () => {
        const embed = new EmbedBuilder()
          .setTitle("💎 Become a Donator! 🌟")
          .setDescription(
            "Support our community and unlock exclusive perks! 🚀\n\n" +
              "🎁 **Perks Include:**\n" +
              "- 🔒 Exclusive Chat Access\n" +
              "- 🎖️ Custom VIP Badge\n" +
              "- 👑 VIP+ Status\n" +
              "- ❤️ Donator Role\n" +
              "And many more surprises! 🎉\n\n" +
              "**Thank you for your support! ❤️**"
          )
          .setColor("#2b2d31")
          .setThumbnail(bannerURL)
          .setImage(ticketGif)
          .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Visit Donator Website 🌐")
            .setStyle(ButtonStyle.Link)
            .setURL(DONATOR_URL)
        );
        return { embeds: [embed], components: [row] };
      },
    },
    {
      // FIX: matcher now matches the actual content being sent ("🌐 303 LIVE SUPPORT"),
      // not the old placeholder text "For support acces this site!" that was never in
      // the payload - causing an infinite-send loop every 5 minutes.
      key: "support_info",
      channelId: SUPPORT_INFO_CHANNEL_ID,
      matcher: (m) =>
        m.content?.includes("🌐 303 LIVE SUPPORT") ||
        m.content?.includes("zws999.github.io/support/"),
      payload: () => ({
        content: [
          "━━━━━━━━━━━━━━━━━━",
          "",
          "🌐 303 LIVE SUPPORT",
          "",
          "Need assistance? Our support team is here to help you. ✨",
          "",
          "📩 Access Support:",
          "https://zws999.github.io/support/",
          "",
          "🕒 Support Schedule",
          "12:00 – 19:00",
          "",
          "🌍 Time Zone",
          "Romania",
          "",
          "⚡ Fast responses, professional assistance, and live support available during working hours.",
          "",
          "━━━━━━━━━━━━━━━━━━",
        ].join("\n"),
      }),
    },
    {
      key: "backup_server",
      channelId: BACKUP_SERVER_CHANNEL_ID,
      matcher: (m) => m.embeds?.[0]?.title === "🛡️ Backup Server",
      payload: () => {
        const embed = new EmbedBuilder()
          .setTitle("🛡️ Backup Server")
          .setDescription(
            [
              "🔗 **Invite:** https://discord.gg/qbvsaR8R6D",
              "📌 Keep this link in case the main server becomes unavailable.",
              "🤝 You're always welcome!",
            ].join("\n")
          )
          .setColor("#2b2d31")
          .setTimestamp();
        return { embeds: [embed] };
      },
    },
    {
      key: "staff_rules",
      channelId: STAFF_RULES_CHANNEL_ID,
      matcher: (m) => m.content?.includes("**1. Professionalism and Attitude**"),
      payload: () => ({
        content: [
          "**1. Professionalism and Attitude**",
          "Always maintain a friendly and respectful attitude towards customers and colleagues.",
          "",
          "**2. Be punctual and adhere to your scheduled working hours.**",
          "",
          "**3. Communication**",
          "Respond clearly and politely to customer inquiries.",
          "",
          "**4. Actively listen to customers' needs and provide suitable solutions.**",
          "Avoid personal conversations in front of customers.",
          "",
          "**Daily Responsibilities**",
          "",
          "**5. Keep your work area clean and organized at all times.**",
          "Check and organize products or services regularly.",
          "",
          "**6. Immediately report any technical issues to the Owner.**",
          "",
          "**7. Follow internal procedures for sales, returns, and warranties.**",
          "",
          "**8. Customer Service**",
          "Greet customers warmly and offer assistance proactively.",
          "",
          "**9. Handle complaints calmly and escalate when necessary.**",
          "Maintain confidentiality of customer information.",
          "",
          "**10. Teamwork**",
          "Support your colleagues and collaborate for efficient service.",
          "Share feedback and ideas for improvement constructively.",
          "",
          mentionRole(STAFF_ID),
        ].join("\n"),
        allowedMentions: { roles: [STAFF_ID] },
      }),
    },
    {
      key: "payment_options",
      channelId: PAYMENT_OPTIONS_CHANNEL_ID,
      matcher: (m) => m.content?.includes("Payment Options"),
      payload: () => ({
        content: [
          "💳 Payment Options 💳-",
          "Paysafecard - Romania",
          "PayPal - Friends&Family",
          "Revolut - 18+",
          "Bitcoin",
          "LTC",
          "@everyone",
        ].join("\n"),
        allowedMentions: { parse: ["everyone"] },
      }),
    },
    {
      key: "tos",
      channelId: TOS_CHANNEL_ID,
      matcher: (m) => m.content?.includes("Terms of Service (TOS)"),
      payload: () => ({
        content: [
          "📜 **Terms of Service (TOS)**",
          "Effective Date: 03.03.2025 📅",
          "",
          "✨ **Welcome to 303 Services / Shop**",
          "By using our services, you agree to these Terms.",
          "",
          "━━━━━━━━━━━━━━━━━━",
          "",
          "📖 **1. Acceptance**",
          "Using our services means you fully agree to these Terms. 🚫",
          "",
          "━━━━━━━━━━━━━━━━━━",
          "",
          "✅ **2. Eligibility**",
          "You must be 14+ to use or purchase from us.",
          "",
          "━━━━━━━━━━━━━━━━━━",
          "",
          "🔒 **3. Account**",
          "You are responsible for your account and all activity under it.",
          "",
          "━━━━━━━━━━━━━━━━━━",
          "",
          "🛍️ **4. Services**",
          "We provide digital products/services.",
          "We may change, update, or remove services anytime.",
          "",
          "━━━━━━━━━━━━━━━━━━",
          "",
          "💳 **5. Payments**",
          "**Payments must be completed before delivery.**",
          "",
          "**Methods:**",
          "**PayPal | Revolut | PaysafeCard | Bitcoin**",
          "",
          "━━━━━━━━━━━━━━━━━━",
          "",
          "🚚 **6. Delivery**",
          "Digital delivery only.",
          "⏰ **1–24** Hours",
          "",
          "💸 Fees: **1%–10%**",
          "",
          "━━━━━━━━━━━━━━━━━━",
          "",
          "❌ **7. Refunds**",
          "**All sales are final. No refunds.**",
          "",
          "━━━━━━━━━━━━━━━━━━",
          "",
          "🚫 **8. Rules**",
          "No abuse, reselling, leaking, or illegal use.",
          "",
          "━━━━━━━━━━━━━━━━━━",
          "",
          "⚠️ **9. Liability**",
          "We are not responsible for losses, downtime, or issues outside our control.",
          "",
          "━━━━━━━━━━━━━━━━━━",
          "",
          "🔄 **10. Changes**",
          "We may update these Terms anytime without notice.",
          "",
          "━━━━━━━━━━━━━━━━━━",
          "",
          "📩 **11. Contact**",
          "Support available via official channels.",
          "",
          "**303 Services / Shop © 2025** ✨",
        ].join("\n"),
        allowedMentions: { parse: [] },
      }),
    },
    {
      key: "staff_qs",
      channelId: STAFF_QS_CHANNEL_ID,
      matcher: (m) => m.content?.includes("Staff Questions & Sanctions"),
      payload: () => ({
        content: [
          "🧑‍💼 **Staff Questions & Sanctions**",
          "",
          "## 1️⃣ Services & Products",
          "❓ **Question:** What services do you offer here?",
          "🗣️ **If incorrect:** Verbal warning.",
          "",
          "❓ **Question:** Do you provide warranty for your services/products?",
          "📝 **If incorrect:** Written warning.",
          "",
          "## 2️⃣ Repairs & Maintenance",
          "❓ **Question:** How long does a typical repair take?",
          "🗣️ **If incorrect:** Verbal warning.",
          "",
          "❓ **Question:** Do I need an appointment or can I just walk in?",
          "📝 **If misleading info:** Written warning.",
          "",
          "## 3️⃣ Products & Availability",
          "❓ **Question:** Do you have this product in stock?",
          "📝 **If false info without checking:** Written warning.",
          "",
          "❓ **Question:** If it's not available, can you order it?",
          "⚠️ **If refuses to help / rude:** Final warning.",
          "",
          "## 4️⃣ Payments & Warranty",
          "❓ **Question:** What payment methods do you accept?",
          "🗣️ **If incorrect:** Verbal warning.",
          "",
          "❓ **Question:** Do you provide an invoice or receipt?",
          "📝 **If \"no\" or refuses:** Written warning (serious).",
          "",
          "## 5️⃣ Customer Interaction",
          "❓ **Question:** Can you recommend the best option for my needs?",
          "📝 **If unhelpful or disrespectful:** Written warning.",
          "",
          "❓ **Question:** Who can I contact if I have an issue after service?",
          "⚠️ **If ignores/avoids:** Final warning / possible suspension.",
          "",
          "### ⚖️ Suggested sanction scale:",
          "🗣️ **Verbal Warning** → First mistake, minor issue.",
          "📝 **Written Warning** → Repeated or important mistake.",
          "⚠️ **Final Warning** → Serious mistake or repeated behavior.",
          "⛔ **Suspension/Termination** → Major violation or refusal to follow company rules.",
          "",
          "@everyone",
        ].join("\n"),
        allowedMentions: { parse: ["everyone"] },
      }),
    },
    {
      key: "social_text",
      channelId: SOCIAL_MEDIA_CHANNEL_ID,
      matcher: (m) =>
        m.author?.id === client.user?.id &&
        (m.content?.includes("Social Media Website") ||
          m.content?.includes("https://zws999.github.io/5t")),
      payload: () => ({
        content: ["🌐 - **Social Media Website** -", "", "https://zws999.github.io/5t"].join("\n"),
      }),
    },
    {
      key: "social_embed",
      channelId: SOCIAL_MEDIA_CHANNEL_ID,
      matcher: (m) => m.embeds?.[0]?.title === "🌐 Social Media Website",
      payload: () => {
        const embed = new EmbedBuilder()
          .setTitle("🌐 Social Media Website")
          .setDescription("Click the button below to open the site:")
          .setColor("#2b2d31")
          .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Open Website")
            .setStyle(ButtonStyle.Link)
            .setURL("https://zws999.github.io/5t")
        );
        return { embeds: [embed], components: [row] };
      },
    },
    {
      key: "help_menu",
      channelId: HELP_CHANNEL_ID,
      matcher: (m) => m.embeds?.[0]?.title?.includes("Help Menu"),
      payload: () => {
        const embed = new EmbedBuilder()
          .setTitle("📋 **Help Menu** - 303 Services/Shop")
          .setDescription("**Select a category below** to see public commands! 🎯\n\n✅")
          .setColor("#2b2d31")
          .setThumbnail(bannerURL)
          .setImage(ticketGif)
          .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("public_help_select")
            .setPlaceholder("🎯 Choose Category")
            .addOptions([
              { label: "🏆 RANK", value: "rank", emoji: "🏆" },
              { label: "⚙️ ANOTHER", value: "other", emoji: "⚙️" },
              { label: "💰 ECONOMY", value: "economy", emoji: "💰" },
            ])
        );
        return { embeds: [embed], components: [row] };
      },
    },
    {
      key: "economy_leaderboard_panel",
      channelId: LEADERBOARD_CHANNEL_ID,
      matcher: (m) => m.embeds?.[0]?.title === "🏆 Economy Leaderboards",
      payload: () => ({
        embeds: [createLeaderboardHomeEmbed()],
        components: [createLeaderboardMenu()],
      }),
    },
    {
      key: "telegram_channel_promo",
      channelId: TELEGRAM_CHANNEL_ID,
      matcher: (m) => m.embeds?.[0]?.title === "📢 Join our Telegram Channel!",
      payload: () => {
        const embed = new EmbedBuilder()
          .setTitle("📢 Join our Telegram Channel!")
          .setDescription(
            [
              "🚀 Stay connected with **303 Services/Shop** outside Discord!",
              "",
              "📲 Join our official Telegram channel to get:",
              "• 🔥 Fast updates and important announcements",
              "• 🎁 Exclusive news and special drops",
              "• 📢 Extra community information",
              "• 💎 More ways to stay in touch with us",
              "",
              "✨ Don't miss anything, join now and stay updated everywhere!",
              "",
              "💙 Thank you for supporting **303 Services/Shop**!",
            ].join("\n")
          )
          .setColor("#2b2d31")
          .setThumbnail(bannerURL)
          .setImage(ticketGif)
          .setFooter({ text: "303 Services/Shop • Official Telegram" })
          .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("Join Telegram Channel")
            .setStyle(ButtonStyle.Link)
            .setURL(TELEGRAM_URL)
            .setEmoji("📲")
        );
        return { embeds: [embed], components: [row] };
      },
    },
  ];
}

function getChannelByConfig(guild, cfg) {
  if (cfg.channelId) return client.channels.cache.get(cfg.channelId);
  if (cfg.channelFinder) return cfg.channelFinder(guild);
  return null;
}

// Guard flag: prevents ensureAllFixedMessages from overlapping runs
let fixedMessageRunning = false;

async function ensureChannelMessage(cfg, guild = null) {
  const channel = getChannelByConfig(guild || client.guilds.cache.get(GUILD_ID), cfg);
  if (!channel || !channel.isTextBased()) return;

  try {
    const recent = await channel.messages.fetch({ limit: 50 }).catch(() => null);
    const exists = recent?.some((m) => {
      try {
        return cfg.matcher(m);
      } catch {
        return false;
      }
    });
    if (exists) return;
    await channel.send(cfg.payload());
  } catch (e) {
    console.error(`[ensureChannelMessage:${cfg.key}]`, e?.message || e);
  }
}

async function refreshChannelMessage(cfg, guild = null) {
  const channel = getChannelByConfig(guild || client.guilds.cache.get(GUILD_ID), cfg);
  if (!channel || !channel.isTextBased()) return;

  try {
    const recent = await channel.messages.fetch({ limit: 50 }).catch(() => null);
    const targets = recent?.filter((m) => {
      try {
        return cfg.matcher(m);
      } catch {
        return false;
      }
    }) || [];
    for (const msg of targets.values()) {
      await msg.delete().catch(() => {});
    }
    await channel.send(cfg.payload());
  } catch (e) {
    console.error(`[refreshChannelMessage:${cfg.key}]`, e?.message || e);
  }
}

async function ensureAllFixedMessages() {
  if (fixedMessageRunning) return;
  fixedMessageRunning = true;
  try {
    const guild = client.guilds.cache.get(GUILD_ID) || client.guilds.cache.first();
    const configs = buildChannelMessageConfig();
    for (const cfg of configs) {
      await ensureChannelMessage(cfg, guild);
    }
  } finally {
    fixedMessageRunning = false;
  }
}

async function maybeRefreshStickyOnMessage(message) {
  if (message.author.bot) return;
  if (message.channel.id !== LANG_STICKY_CHANNEL_ID) return;
  if (isOnCooldown(stickyRefreshCooldown, message.channel.id, 4000)) return;

  const cfg = buildChannelMessageConfig().find((x) => x.key === "lang_sticky");
  if (!cfg) return;

  setTimeout(async () => {
    await refreshChannelMessage(cfg);
  }, 1500);
}

// ===================== SLASH COMMANDS =====================
function buildGuildCommands() {
  return [
    new SlashCommandBuilder()
      .setName("feedback")
      .setDescription("Submit customer feedback")
      .addIntegerOption((o) =>
        o.setName("rating").setDescription("Rate the support from 1 to 5").setRequired(true).setMinValue(1).setMaxValue(5)
      )
      .addStringOption((o) =>
        o.setName("service").setDescription("What service did you purchase?").setRequired(true)
      ),

    new SlashCommandBuilder().setName("setup").setDescription("Setup ticket system"),
    new SlashCommandBuilder().setName("setupstaff").setDescription("Setup staff application system"),
    new SlashCommandBuilder().setName("rank").setDescription("View your text and voice levels"),
    new SlashCommandBuilder().setName("daily").setDescription("Claim your daily coins reward"),
    new SlashCommandBuilder().setName("balance").setDescription("Check your current coin balance"),

    new SlashCommandBuilder()
      .setName("recharge")
      .setDescription("Add coins to a user (restricted role only)")
      .addIntegerOption((o) =>
        o.setName("amount").setDescription(`Amount of coins to add (max ${RECHARGE_MAX_AMOUNT})`).setRequired(true).setMinValue(1).setMaxValue(RECHARGE_MAX_AMOUNT)
      )
      .addUserOption((o) =>
        o.setName("user").setDescription("User to receive the coins").setRequired(true)
      ),

    new SlashCommandBuilder().setName("leaderboard").setDescription("Open the economy leaderboard menu"),

    new SlashCommandBuilder()
      .setName("coinflip")
      .setDescription("Challenge another user to a 50/50 coinflip")
      .addIntegerOption((o) =>
        o.setName("amount").setDescription("Bet amount").setRequired(true).setMinValue(1)
      )
      .addUserOption((o) =>
        o.setName("user").setDescription("User to challenge").setRequired(true)
      ),

    new SlashCommandBuilder()
      .setName("dice")
      .setDescription("Roll the dice and try to win coins")
      .addIntegerOption((o) =>
        o.setName("amount").setDescription("Bet amount").setRequired(true).setMinValue(1)
      ),

    new SlashCommandBuilder()
      .setName("slots")
      .setDescription("Spin the slots for a chance to win big")
      .addIntegerOption((o) =>
        o.setName("amount").setDescription("Bet amount").setRequired(true).setMinValue(1)
      ),

    new SlashCommandBuilder()
      .setName("blackjack")
      .setDescription("Play blackjack against the dealer")
      .addIntegerOption((o) =>
        o.setName("amount").setDescription("Bet amount").setRequired(true).setMinValue(1)
      ),

    new SlashCommandBuilder()
      .setName("giveaway")
      .setDescription("Host a giveaway (only for admins)")
      .addIntegerOption((o) =>
        o.setName("duration").setDescription("Duration in minutes").setRequired(true).setMinValue(1)
      )
      .addStringOption((o) =>
        o.setName("prize").setDescription("The prize for the giveaway").setRequired(true)
      )
      .addStringOption((o) =>
        o.setName("description").setDescription("Additional description for the giveaway").setRequired(true)
      ),

    new SlashCommandBuilder().setName("drop").setDescription("Start a drop event"),

    new SlashCommandBuilder()
      .setName("stats")
      .setDescription("View your full gambling and economy stats")
      .addUserOption((o) =>
        o.setName("user").setDescription("Check another user's stats (leave blank for yourself)")
      ),

    new SlashCommandBuilder()
      .setName("setavatar")
      .setDescription("Change the bot's avatar (owner only)")
      .addStringOption((o) =>
        o.setName("url").setDescription("Direct image URL (.png, .jpg, .gif)").setRequired(true)
      ),

    new SlashCommandBuilder()
      .setName("resetstats")
      .setDescription("(Admin) Reset a user's economy or gambling stats")
      .addUserOption((o) =>
        o.setName("user").setDescription("User to reset").setRequired(true)
      )
      .addStringOption((o) =>
        o
          .setName("type")
          .setDescription("What to reset")
          .setRequired(true)
          .addChoices(
            { name: "Gambling stats only (wins/losses/counts)", value: "gambling" },
            { name: "Balance only (coins reset to starting amount)", value: "balance" },
            { name: "Daily streak & claims", value: "daily" },
            { name: "Everything (full economy wipe)", value: "all" }
          )
      ),

    new SlashCommandBuilder()
      .setName("poll")
      .setDescription("Create a poll")
      .addStringOption((o) => o.setName("question").setDescription("The poll question").setRequired(true))
      .addStringOption((o) => o.setName("answer1").setDescription("Answer 1").setRequired(true))
      .addStringOption((o) => o.setName("answer2").setDescription("Answer 2").setRequired(true))
      .addIntegerOption((o) =>
        o.setName("maxchoices").setDescription("How many answers can each user choose? (Default: 1)").setMinValue(1).setMaxValue(6)
      )
      .addStringOption((o) => o.setName("text").setDescription("Which text should appear above the poll?"))
      .addStringOption((o) => o.setName("answer3").setDescription("Answer 3"))
      .addStringOption((o) => o.setName("answer4").setDescription("Answer 4"))
      .addStringOption((o) => o.setName("answer5").setDescription("Answer 5"))
      .addStringOption((o) => o.setName("answer6").setDescription("Answer 6")),
  ].map((c) => c.toJSON());
}

function buildGlobalCommands() {
  return [
    new SlashCommandBuilder()
      .setName("vcustomer")
      .setDescription("Send proof of purchase (only in DM)")
      .addAttachmentOption((o) =>
        o.setName("proof").setDescription("Attach photo of the received product").setRequired(true)
      )
      .setDMPermission(true)
      .toJSON(),
  ];
}

// ===================== READY (single handler) =====================
client.once(Events.ClientReady, async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  client.user.setPresence({
    status: "online",
    activities: [
      { name: "303 Services/Shop", type: 3 },
      { name: "discord.gg/303shop", type: 0 },
    ],
  });

  // Avatar system - set bot avatar from URL (AVATAR_URL env var or default banner)
  await setAvatar(client);

  await client.application.fetch().catch(() => {});

  const guild = client.guilds.cache.get(GUILD_ID) || client.guilds.cache.first();
  if (guild) {
    await cacheGuildInvites(guild);

    // Remove vcustomer from guild commands if it snuck in
    try {
      const commands = await guild.commands.fetch();
      const vcustomerCmd = commands.find((cmd) => cmd.name === "vcustomer");
      if (vcustomerCmd) await vcustomerCmd.delete().catch(() => {});
    } catch (err) {
      console.error("[vcustomer delete guild]", err?.message || err);
    }

    try {
      await guild.commands.set(buildGuildCommands());
      console.log("Guild slash commands registered.");
    } catch (err) {
      console.error("[guild.commands.set]", err?.message || err);
    }
  }

  try {
    await client.application.commands.set(buildGlobalCommands());
    console.log("Global commands registered.");
  } catch (err) {
    console.error("[global.commands.set]", err?.message || err);
  }

  await ensureAllFixedMessages();
  await refreshPublicLeaderboardMessage();

  // FIX: intervals are started INSIDE the ready handler so they only
  // run after the client is fully connected and guild caches are populated.
  setInterval(async () => {
    await ensureAllFixedMessages();
  }, 300_000);

  setInterval(async () => {
    await refreshPublicLeaderboardMessage();
  }, 300_000);

  // Voice XP loop - 1 minute per tick
  setInterval(() => {
    client.guilds.cache.forEach((g) => {
      g.voiceStates.cache.forEach((state) => {
        if (
          state.channelId &&
          !state.selfMute &&
          !state.selfDeaf &&
          !state.member?.user?.bot
        ) {
          const userId = state.member.id;
          ensureUserLevel(userId);
          ensureEconomyUser(userId);

          const oldInfo = getVoiceLevelInfo(levels[userId].voice);
          levels[userId].voice++;
          saveLevels();
          const newInfo = getVoiceLevelInfo(levels[userId].voice);
          if (newInfo.level > oldInfo.level) {
            checkLevelUp(userId, g, "Voice", newInfo.level).catch(() => {});
          }
        }
      });
    });
  }, 60_000);
});

// ===================== MESSAGE CREATE =====================
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  await maybeRefreshStickyOnMessage(message);

  if (!message.guild) return;

  if (!isOnCooldown(xpCooldowns, message.author.id, 15_000)) {
    const userId = message.author.id;
    ensureUserLevel(userId);
    ensureEconomyUser(userId);

    const oldInfo = getTextLevelInfo(levels[userId].text);
    levels[userId].text++;
    saveLevels();
    const newInfo = getTextLevelInfo(levels[userId].text);
    if (newInfo.level > oldInfo.level) {
      await checkLevelUp(userId, message.guild, "Text", newInfo.level).catch(() => {});
    }
  }
});

// ===================== MEMBER ADD =====================
client.on(Events.GuildMemberAdd, async (member) => {
  const userRole = member.guild.roles.cache.get(AUTO_ROLE_ID);
  if (userRole) await member.roles.add(userRole).catch(() => {});

  if (member.user.bot) {
    const botRole = member.guild.roles.cache.get(BOT_ROLE_ID);
    if (botRole) await member.roles.add(botRole).catch(() => {});
  }

  ensureEconomyUser(member.id);
  saveEconomy();

  const welcomeChannel = member.guild.channels.cache.find((ch) => ch.name === WELCOME_CHANNEL_NAME);
  if (welcomeChannel?.isTextBased()) {
    const accountAge = `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`;
    const joinDate = `<t:${Math.floor(Date.now() / 1000)}:f>`;

    const embed = new EmbedBuilder()
      .setTitle(`🎉 WELCOME TO ${SERVER_NAME}!`)
      .setDescription(
        `Welcome to ${SERVER_NAME}, ${member}!\n\n💰 You received **${formatNumber(STARTING_COINS)} free coins** to get started in the economy system.`
      )
      .addFields(
        { name: "📅 Join Date", value: joinDate, inline: true },
        { name: "🧾 Account Age", value: accountAge, inline: true },
        { name: "👥 Member #", value: `${member.guild.memberCount}th member`, inline: true }
      )
      .setColor("Blue")
      .setThumbnail(member.user.displayAvatarURL({ forceStatic: false }))
      .setImage(ticketGif)
      .setFooter({ text: `${SERVER_NAME} • Welcome System` })
      .setTimestamp();

    await welcomeChannel.send({ embeds: [embed] }).catch(() => {});
  }

  await handleInviteLogger(member);
});

// ===================== MEMBER REMOVE =====================
client.on(Events.GuildMemberRemove, async (member) => {
  const goodbyeChannel = member.guild.channels.cache.find((ch) => ch.name === GOODBYE_CHANNEL_NAME);
  if (!goodbyeChannel?.isTextBased()) return;
  await goodbyeChannel.send({ content: `👋 **${member.user.tag}** has left the server.` }).catch(() => {});
});

// ===================== BOOST DETECT =====================
client.on(Events.GuildMemberUpdate, async (oldMember, newMember) => {
  if (oldMember.premiumSince === null && newMember.premiumSince !== null) {
    const channel = client.channels.cache.get(BOOST_CHANNEL_ID);
    if (channel?.isTextBased()) {
      await channel.send(`${newMember.toString()} has **boosted** the server!`).catch(() => {});
    }
  }
});

// ===================== INTERACTION CREATE =====================
client.on(Events.InteractionCreate, async (interaction) => {
  try {
    await handleInteraction(interaction);
  } catch (e) {
    console.error("[InteractionCreate]", e);
    const msg = { content: "❌ An unexpected error occurred.", flags: MessageFlags.Ephemeral };
    if (interaction.deferred || interaction.replied) {
      await interaction.followUp(msg).catch(() => {});
    } else {
      await interaction.reply(msg).catch(() => {});
    }
  }
});

async function handleInteraction(interaction) {
  // -------- SELECT MENUS --------
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === "lang_sticky_select") {
      const lang = interaction.values[0];
      return interaction.reply({
        embeds: [createLanguageEmbed(lang)],
        components: [createLanguageMenu()],
        flags: MessageFlags.Ephemeral,
      });
    }

    if (interaction.customId === "public_help_select") {
      const cat = interaction.values[0];
      let text;
      if (cat === "rank") {
        text = ["**🏆 RANK COMMANDS**", "`/rank` - View your text and voice levels."].join("\n");
      } else if (cat === "economy") {
        text = [
          "**💰 ECONOMY COMMANDS**",
          "`/balance` - Check your balance.",
          "`/daily` - Claim your daily reward.",
          "`/recharge amount: user:` - Add coins to a user (restricted role).",
          "`/leaderboard` - Open the leaderboard menu.",
          "`/coinflip amount: user:` - Challenge another user.",
          "`/dice amount:` - Roll dice to win coins.",
          "`/slots amount:` - Spin the slots.",
          "`/blackjack amount:` - Play blackjack vs dealer.",
        ].join("\n");
      } else {
        text = [
          "**⚙️ OTHER COMMANDS**",
          "`/feedback` - Send feedback after a purchase.",
          "`/vcustomer` - Send proof in DM.",
        ].join("\n");
      }
      return interaction.reply({ content: text, flags: MessageFlags.Ephemeral });
    }

    if (interaction.customId === "economy_leaderboard_select") {
      const category = interaction.values[0];
      const embed = await buildLeaderboardCategoryEmbed(category, interaction.guild);
      return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    }

    if (interaction.customId === "ticket_select") {
      const guild = interaction.guild;
      const user = interaction.user;
      const type = interaction.values[0];
      let ticketChannel;

      if (type === "support") {
        const staffRole = guild.roles.cache.get(SUPPORT_CLAIM_ROLE_ID);
        if (!staffRole) {
          return interaction.reply({ content: "❌ Support role not found.", flags: MessageFlags.Ephemeral });
        }

        ticketChannel = await guild.channels.create({
          name: `support-${user.username}`.slice(0, 100),
          type: ChannelType.GuildText,
          permissionOverwrites: [
            { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
            { id: user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
            { id: staffRole.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
          ],
        });

        await ticketChannel.send({
          content: `${mentionRole(SUPPORT_CLAIM_ROLE_ID)} ${user}`,
          allowedMentions: { users: uniq([user.id]), roles: uniq([SUPPORT_CLAIM_ROLE_ID]) },
        });
      } else {
        ticketChannel = await guild.channels.create({
          name: `buy-${user.username}`.slice(0, 100),
          type: ChannelType.GuildText,
          permissionOverwrites: [
            { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
            { id: user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
            { id: BUY_ROLE_ID, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
          ],
        });

        await ticketChannel.send({
          content: `${mentionRole(BUY_ROLE_ID)} ${user}`,
          allowedMentions: { users: uniq([user.id]), roles: uniq([BUY_ROLE_ID]) },
        });
      }

      const embed = new EmbedBuilder()
        .setTitle(`🎟️ ${type.toUpperCase()} Ticket Created`)
        .setDescription(`Ticket created by ${user}`)
        .setColor("#00b0f4")
        .setImage(ticketGif)
        .setTimestamp();

      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("claim_ticket").setLabel("🎯 Claim Ticket").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("close_ticket").setLabel("🔒 Close Ticket").setStyle(ButtonStyle.Danger)
      );
      const extraButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("unclaim_ticket").setLabel("↩️ Unclaim Ticket").setStyle(ButtonStyle.Secondary)
      );

      await ticketChannel.send({ embeds: [embed], components: [buttons] });
      await ticketChannel.send({ components: [extraButtons] });

      return interaction.reply({ content: `✅ Ticket created: ${ticketChannel}`, flags: MessageFlags.Ephemeral });
    }

    if (interaction.customId === "staff_apply_select") {
      const guild = interaction.guild;
      const user = interaction.user;

      const ticketChannel = await guild.channels.create({
        name: `staff-apply-${user.username}`.slice(0, 100),
        type: ChannelType.GuildText,
        permissionOverwrites: [
          { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
          { id: user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
          ...STAFF_APP_ACCESS_ROLE_IDS.map((rid) => ({
            id: rid,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
          })),
        ],
      });

      await ticketChannel.send({
        content: `${user} ${uniq(STAFF_APP_ACCESS_ROLE_IDS).map((id) => mentionRole(id)).join(" ")}`,
        allowedMentions: { users: uniq([user.id]), roles: uniq(STAFF_APP_ACCESS_ROLE_IDS) },
      });

      const embed = new EmbedBuilder()
        .setTitle("📝 Staff Application Ticket")
        .setDescription(`Ticket created by ${user}`)
        .setColor("#00b0f4")
        .setImage(ticketGif)
        .setTimestamp();

      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("claim_ticket").setLabel("🎯 Claim Ticket").setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId("close_ticket").setLabel("🔒 Close Ticket").setStyle(ButtonStyle.Danger)
      );
      const extraButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("unclaim_ticket").setLabel("↩️ Unclaim Ticket").setStyle(ButtonStyle.Secondary)
      );

      await ticketChannel.send({ embeds: [embed], components: [buttons] });
      await ticketChannel.send({ components: [extraButtons] });

      return interaction.reply({ content: `✅ Ticket created: ${ticketChannel}`, flags: MessageFlags.Ephemeral });
    }
  }

  // -------- BUTTONS --------
  if (interaction.isButton()) {
    const channel = interaction.channel;
    const user = interaction.user;
    const guild = interaction.guild;

    if (interaction.customId === "dm_bot_benefits") {
      try {
        const dm = await interaction.user.createDM();
        await dm.send(
          "Hello! You can now use the command **/vcustomer** here to send your proof.\nJust attach the photo of the product you received."
        );
        return interaction.reply({ content: "✅ I opened a DM with you! Check your direct messages.", flags: MessageFlags.Ephemeral });
      } catch {
        return interaction.reply({
          content: "❌ I couldn't open DM. Please enable DMs from server members.",
          flags: MessageFlags.Ephemeral,
        });
      }
    }

    if (interaction.customId === "claim_ticket") {
      let canClaim = false;
      if (channel.name.startsWith("support")) {
        canClaim = hasRole(interaction.member, SUPPORT_CLAIM_ROLE_ID);
      } else if (channel.name.startsWith("buy")) {
        canClaim = hasRole(interaction.member, BUY_ROLE_ID);
      } else if (channel.name.startsWith("staff-apply")) {
        canClaim = hasAnyRole(interaction.member, STAFF_APP_CLAIM_ROLE_IDS);
      }

      if (!canClaim) {
        return interaction.reply({ content: "❌ You cannot claim this ticket.", flags: MessageFlags.Ephemeral });
      }

      const alreadyClaimedId = getClaimedUserIdFromTopic(channel.topic || "");
      if (alreadyClaimedId) {
        return interaction.reply({
          content: `This ticket is already claimed by: ${mentionUser(alreadyClaimedId)}!`,
          flags: MessageFlags.Ephemeral,
        });
      }

      await setChannelClaim(channel, user.id).catch(() => {});
      return interaction.reply({ content: `✅ Ticket claimed by ${user}` });
    }

    if (interaction.customId === "unclaim_ticket") {
      const claimedId = getClaimedUserIdFromTopic(channel.topic || "");
      if (!claimedId) {
        return interaction.reply({ content: "ℹ️ This ticket is not claimed yet.", flags: MessageFlags.Ephemeral });
      }
      if (claimedId !== user.id) {
        return interaction.reply({
          content: `❌ Only ${mentionUser(claimedId)} can unclaim this ticket.`,
          flags: MessageFlags.Ephemeral,
        });
      }
      await clearChannelClaim(channel).catch(() => {});
      await channel.send({ content: `${mentionUser(user.id)} has unclaimed the ticket!` });
      return interaction.reply({ content: "✅ You have unclaimed this ticket.", flags: MessageFlags.Ephemeral });
    }

    if (interaction.customId === "close_ticket") {
      // FIX: defer before doing slow async work (fetching messages, deleting channel)
      await interaction.deferReply({ flags: MessageFlags.Ephemeral });

      const transcriptChannel = guild.channels.cache.find(
        (c) => c.name === "transcripts" && c.type === ChannelType.GuildText
      );
      if (!transcriptChannel) {
        return interaction.editReply({ content: "❌ #transcripts not found." });
      }

      const messages = await channel.messages.fetch({ limit: 100 }).catch(() => null);
      let transcript = `Transcript #${channel.name}\n\n`;

      messages
        ?.sort((a, b) => a.createdTimestamp - b.createdTimestamp)
        .forEach((msg) => {
          const attachments = msg.attachments.size
            ? ` [Attachments: ${Array.from(msg.attachments.values()).map((a) => a.url).join(", ")}]`
            : "";
          transcript += `[${msg.createdAt.toLocaleString()}] ${msg.author.tag}: ${msg.content}${attachments}\n`;
        });

      await transcriptChannel
        .send({ content: `\`\`\`\n${truncate(transcript, 1990)}\n\`\`\`` })
        .catch(() => {});

      await channel.send({ content: `🔒 Ticket Closed By: ${user}` }).catch(() => {});
      await interaction.editReply({ content: "✅ Ticket closed." }).catch(() => {});
      await channel.delete().catch(() => {});
      return;
    }

    if (interaction.customId === "enter_giveaway") {
      const giveaway = giveaways.get(interaction.message.id);
      if (!giveaway) {
        return interaction.reply({ content: "❌ This giveaway has ended or is invalid.", flags: MessageFlags.Ephemeral });
      }
      if (giveaway.entrants.has(interaction.user.id)) {
        return interaction.reply({ content: "ℹ️ You have already entered this giveaway.", flags: MessageFlags.Ephemeral });
      }

      giveaway.entrants.add(interaction.user.id);

      const updatedEmbed = new EmbedBuilder()
        .setTitle(`🎉 Giveaway: ${giveaway.prize}`)
        .setDescription(
          `${giveaway.description}\n\n**Entries:** ${giveaway.entrants.size}\n**Ends at:** <t:${Math.floor(
            giveaway.endTime / 1000
          )}:R>\n**Hosted by:** ${giveaway.host}`
        )
        .setColor("#FFD700")
        .setThumbnail(ticketGif)
        .setTimestamp(giveaway.endTime)
        .setFooter({ text: "Click the button to enter! Everyone has equal chances." });

      const updatedRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("enter_giveaway")
          .setLabel(`Enter (${giveaway.entrants.size})`)
          .setStyle(ButtonStyle.Primary)
          .setEmoji("🎉")
      );

      await interaction.update({ embeds: [updatedEmbed], components: [updatedRow] });
      return interaction.followUp({
        content: `✅ You have entered the giveaway for **${giveaway.prize}**!`,
        flags: MessageFlags.Ephemeral,
      });
    }

    if (interaction.customId.startsWith("poll_vote_")) {
      const pollId = interaction.message.id;
      const poll = polls.get(pollId);
      if (!poll) return interaction.reply({ content: "❌ Poll invalid.", flags: MessageFlags.Ephemeral });

      const choiceIndex = parseInt(interaction.customId.split("_")[2], 10);
      const userVotes = poll.votes.get(interaction.user.id) || [];

      if (userVotes.includes(choiceIndex)) {
        userVotes.splice(userVotes.indexOf(choiceIndex), 1);
        poll.voteCounts[choiceIndex]--;
      } else {
        if (userVotes.length >= poll.maxchoices) {
          return interaction.reply({ content: "❌ You have reached the maximum number of choices.", flags: MessageFlags.Ephemeral });
        }
        userVotes.push(choiceIndex);
        poll.voteCounts[choiceIndex]++;
      }

      poll.votes.set(interaction.user.id, userVotes);

      const updatedEmbed = new EmbedBuilder()
        .setTitle(poll.question)
        .setDescription(poll.text)
        .setColor("#00FF00")
        .setFooter({ text: `Poll ID: ${pollId}` });

      // FIX: split poll buttons across rows of max 5 to avoid the Discord limit
      const rows = buildPollButtonRows(poll);
      const totalParticipants = poll.votes.size;
      const infoRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("poll_manage_votes")
          .setLabel("Manage your votes")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId("poll_view_participants")
          .setLabel(`Participants (${totalParticipants})`)
          .setStyle(ButtonStyle.Secondary)
      );

      return interaction.update({ embeds: [updatedEmbed], components: [...rows, infoRow] });
    }

    if (interaction.customId === "poll_view_participants") {
      if (!hasRole(interaction.member, VIEW_PARTICIPANTS_ROLE_ID)) {
        return interaction.reply({ content: "❌ You do not have permission to view participants.", flags: MessageFlags.Ephemeral });
      }

      const pollId = interaction.message.id;
      const poll = polls.get(pollId);
      if (!poll) return interaction.reply({ content: "❌ Poll invalid.", flags: MessageFlags.Ephemeral });

      let participantsText = "Participants:\n";
      if (poll.votes.size === 0) {
        participantsText += "No participants yet.";
      } else {
        for (const [userId, choices] of poll.votes) {
          const userFetched = await client.users.fetch(userId).catch(() => null);
          const username = userFetched ? userFetched.tag : "Unknown user";
          const votedOptions = choices.map((idx) => poll.answers[idx]).join(", ") || "No votes";
          participantsText += `${username}: ${votedOptions}\n`;
        }
      }

      return interaction.reply({ content: truncate(participantsText, 1900), flags: MessageFlags.Ephemeral });
    }

    // COINFLIP ACCEPT
    if (interaction.customId.startsWith("coinflip_accept_")) {
      const challengeId = interaction.customId.replace("coinflip_accept_", "");
      const challenge = pendingCoinflips.get(challengeId);

      if (!challenge) {
        return interaction.reply({ content: "❌ This coinflip request is no longer valid.", flags: MessageFlags.Ephemeral });
      }
      if (interaction.user.id !== challenge.targetId) {
        return interaction.reply({ content: "❌ This coinflip is not for you.", flags: MessageFlags.Ephemeral });
      }
      if (challenge.status !== "pending") {
        return interaction.reply({ content: "❌ This coinflip request has already been handled.", flags: MessageFlags.Ephemeral });
      }

      const challengerData = ensureEconomyUser(challenge.challengerId);
      const targetData = ensureEconomyUser(challenge.targetId);

      if (challengerData.coins < challenge.amount) {
        challenge.status = "cancelled";
        saveEconomy();
        return interaction.update({
          content: `❌ ${mentionUser(challenge.challengerId)} no longer has enough coins for this coinflip.`,
          components: [],
          embeds: [],
        });
      }

      if (targetData.coins < challenge.amount) {
        challenge.status = "cancelled";
        saveEconomy();
        return interaction.update({
          content: `❌ ${mentionUser(challenge.targetId)} does not have enough coins to accept this coinflip.`,
          components: [],
          embeds: [],
        });
      }

      const flip = Math.random() < 0.5 ? "heads" : "tails";
      const winnerId = Math.random() < 0.5 ? challenge.challengerId : challenge.targetId;
      const loserId = winnerId === challenge.challengerId ? challenge.targetId : challenge.challengerId;

      addCoins(winnerId, challenge.amount);
      addCoins(loserId, -challenge.amount);
      recordGambleWin(winnerId, challenge.amount, "coinflip");
      recordGambleLoss(loserId, challenge.amount, "coinflip");

      challenge.status = "done";
      challenge.result = flip;
      challenge.winnerId = winnerId;
      saveEconomy();

      await interaction.update({
        embeds: [
          new EmbedBuilder()
            .setTitle("🪙 Coinflip Result")
            .setDescription(
              [
                `🎯 Challenger: ${mentionUser(challenge.challengerId)}`,
                `🎯 Opponent: ${mentionUser(challenge.targetId)}`,
                `💸 Bet: **${formatNumber(challenge.amount)}** coins each`,
                `🪙 Result: **${flip.toUpperCase()}**`,
                `🏆 Winner: ${mentionUser(winnerId)}`,
              ].join("\n")
            )
            .setColor("#2ecc71")
            .setTimestamp(),
        ],
        components: [],
      });

      const winnerUser = await client.users.fetch(winnerId).catch(() => null);
      const loserUser = await client.users.fetch(loserId).catch(() => null);

      if (winnerUser) {
        await winnerUser
          .send(
            `🪙 You **won** the coinflip!\nResult: **${flip.toUpperCase()}**\nYou won **${formatNumber(challenge.amount)}** coins against **${loserUser?.tag || loserId}**.`
          )
          .catch(() => {});
      }
      if (loserUser) {
        await loserUser
          .send(
            `🪙 You **lost** the coinflip.\nResult: **${flip.toUpperCase()}**\nYou lost **${formatNumber(challenge.amount)}** coins against **${winnerUser?.tag || winnerId}**.`
          )
          .catch(() => {});
      }
      return;
    }

    // COINFLIP DECLINE
    if (interaction.customId.startsWith("coinflip_decline_")) {
      const challengeId = interaction.customId.replace("coinflip_decline_", "");
      const challenge = pendingCoinflips.get(challengeId);

      if (!challenge) {
        return interaction.reply({ content: "❌ This coinflip request is no longer valid.", flags: MessageFlags.Ephemeral });
      }
      if (interaction.user.id !== challenge.targetId) {
        return interaction.reply({ content: "❌ This coinflip is not for you.", flags: MessageFlags.Ephemeral });
      }

      challenge.status = "declined";
      saveEconomy();

      return interaction.update({
        embeds: [
          new EmbedBuilder()
            .setTitle("🪙 Coinflip Declined")
            .setDescription(
              `${mentionUser(challenge.targetId)} declined the **${formatNumber(challenge.amount)} coin** coinflip from ${mentionUser(challenge.challengerId)}.`
            )
            .setColor("#e74c3c")
            .setTimestamp(),
        ],
        components: [],
      });
    }

    // BLACKJACK HIT
    if (interaction.customId.startsWith("blackjack_hit_")) {
      const ownerId = interaction.customId.replace("blackjack_hit_", "");
      if (interaction.user.id !== ownerId) {
        return interaction.reply({ content: "❌ This blackjack game is not yours.", flags: MessageFlags.Ephemeral });
      }

      const game = blackjackGames.get(ownerId);
      if (!game) {
        return interaction.reply({ content: "❌ No blackjack game found.", flags: MessageFlags.Ephemeral });
      }

      game.player.push(drawBlackjackCard());
      const value = blackjackHandValue(game.player);

      if (value > 21) {
        blackjackGames.delete(ownerId);
        recordGambleLoss(ownerId, game.bet, "blackjack");
        return interaction.update({
          embeds: [createBlackjackEmbed(interaction.user, game, true, `💥 Bust! You lost ${formatNumber(game.bet)} coins.`)],
          components: [],
        });
      }

      return interaction.update({
        embeds: [createBlackjackEmbed(interaction.user, game, false)],
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`blackjack_hit_${interaction.user.id}`).setLabel("Hit").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId(`blackjack_stand_${interaction.user.id}`).setLabel("Stand").setStyle(ButtonStyle.Success)
          ),
        ],
      });
    }

    // BLACKJACK STAND
    if (interaction.customId.startsWith("blackjack_stand_")) {
      const ownerId = interaction.customId.replace("blackjack_stand_", "");
      if (interaction.user.id !== ownerId) {
        return interaction.reply({ content: "❌ This blackjack game is not yours.", flags: MessageFlags.Ephemeral });
      }

      const game = blackjackGames.get(ownerId);
      if (!game) {
        return interaction.reply({ content: "❌ No blackjack game found.", flags: MessageFlags.Ephemeral });
      }

      while (blackjackHandValue(game.dealer) < 17) {
        game.dealer.push(drawBlackjackCard());
      }

      const playerValue = blackjackHandValue(game.player);
      const dealerValue = blackjackHandValue(game.dealer);
      let resultText = "";
      let color = "#2ecc71";

      if (dealerValue > 21 || playerValue > dealerValue) {
        addCoins(ownerId, game.bet * 2);
        recordGambleWin(ownerId, game.bet, "blackjack");
        resultText = `🏆 You won ${formatNumber(game.bet)} coins!`;
      } else if (dealerValue === playerValue) {
        addCoins(ownerId, game.bet);
        recordGambleDraw(ownerId, "blackjack");
        resultText = "🤝 Push! Your bet was returned.";
        color = "#f1c40f";
      } else {
        recordGambleLoss(ownerId, game.bet, "blackjack");
        resultText = `💀 Dealer wins. You lost ${formatNumber(game.bet)} coins.`;
        color = "#e74c3c";
      }

      blackjackGames.delete(ownerId);
      const embed = createBlackjackEmbed(interaction.user, game, true, resultText).setColor(color);
      return interaction.update({ embeds: [embed], components: [] });
    }
  }

  // -------- CHAT INPUT COMMANDS --------
  if (!interaction.isChatInputCommand()) return;

  ensureEconomyUser(interaction.user.id);

  if (interaction.commandName === "feedback") {
    if (interaction.channel.id !== "1459323325623832627") {
      return interaction.reply({
        content: "🚫 You can't submit feedback here! Please head over to <#1459323325623832627> to share your thoughts. Thanks! 😊",
        flags: MessageFlags.Ephemeral,
      });
    }

    const rating = interaction.options.getInteger("rating");
    const service = interaction.options.getString("service");
    const stars = "<a:star1:1459332765177610456>".repeat(rating);

    const embed = new EmbedBuilder()
      .setTitle("📢 Customer Feedback")
      .addFields(
        { name: "<:num1:1459332511351050332> Support Work Evaluation", value: stars, inline: false },
        { name: "<:num2:1459332909227053196> Staff Helped", value: `<:staffEmoji:1459333057046773903> <@679166959316762629>`, inline: false },
        { name: "<:num3:1459333179117670420> Service Purchased", value: service, inline: false },
        { name: "<:num4:1459333277541339206> Feedback Sent By", value: `<:userEmoji:1459333391471087687> ${interaction.user.tag}`, inline: false }
      )
      .setColor("Blue")
      .setFooter({ text: `303 Feedback • ${interaction.user.username}` })
      .setTimestamp()
      .setImage(ticketGif);

    return interaction.reply({ embeds: [embed] });
  }

  if (interaction.commandName === "setup" || interaction.commandName === "setupstaff") {
    if (!hasRole(interaction.member, ADMIN_ROLE_ID)) {
      return interaction.reply({ content: "❌ No permission.", flags: MessageFlags.Ephemeral });
    }

    let embed, selectMenu;

    if (interaction.commandName === "setup") {
      embed = new EmbedBuilder()
        .setTitle("🎟️ Ticket System")
        .setDescription("Select ticket type: Buy 🛒 or Support 🧰")
        .setColor("#2b2d31")
        .setThumbnail(bannerURL)
        .setImage(ticketGif);

      selectMenu = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("ticket_select")
          .setPlaceholder("Choose ticket type")
          .addOptions([
            { label: "Buy 🛒", description: "Purchase related", value: "buy" },
            { label: "Support 🧰", description: "Technical help", value: "support" },
          ])
      );
    } else {
      embed = new EmbedBuilder()
        .setTitle("📝 Staff Application")
        .setDescription("Click dropdown to start staff application ticket")
        .setColor("#2b2d31")
        .setThumbnail(bannerURL)
        .setImage(ticketGif);

      selectMenu = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("staff_apply_select")
          .setPlaceholder("Apply for Staff")
          .addOptions([{ label: "Apply 🛡️", description: "Start application", value: "apply_staff" }])
      );
    }

    await interaction.reply({ content: "✅ Setup done.", flags: MessageFlags.Ephemeral });
    return interaction.channel.send({ embeds: [embed], components: [selectMenu] });
  }

  if (interaction.commandName === "rank") {
    const userId = interaction.user.id;
    ensureUserLevel(userId);

    const textInfo = getTextLevelInfo(levels[userId].text);
    const voiceInfo = getVoiceLevelInfo(levels[userId].voice);
    const textBar = createProgressBar(textInfo.progress, textInfo.required);
    const voiceBar = createProgressBar(voiceInfo.progress, voiceInfo.required);

    const embed = new EmbedBuilder()
      .setTitle("🏆 Your Rank Overview 🌟")
      .setColor("#00FF00")
      .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: false }))
      .addFields(
        {
          name: "📝 Text Level",
          value: `Level **${textInfo.level}** 🎈\nTotal Messages: **${levels[userId].text}** 💬\nProgress: ${textBar} (${textInfo.progress}/${textInfo.required})\nTo Next: **${textInfo.toNext}** messages 🚀`,
          inline: false,
        },
        {
          name: "🎤 Voice Level",
          value: `Level **${voiceInfo.level}** 🎙️\nTotal Minutes: **${levels[userId].voice}** ⏰\nProgress: ${voiceBar} (${voiceInfo.progress}/${voiceInfo.required})\nTo Next: **${voiceInfo.toNext}** minutes 🔥`,
          inline: false,
        }
      )
      .setFooter({ text: "Level up and unlock awesome features! ⭐🎉" })
      .setTimestamp();

    return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }

  if (interaction.commandName === "balance") {
    const data = ensureEconomyUser(interaction.user.id);
    const embed = new EmbedBuilder()
      .setTitle("💰 Your Balance")
      .setDescription(
        [
          `Coins: **${formatNumber(data.coins)}**`,
          `Daily Streak: **${formatNumber(data.dailyStreak)}**`,
          `Total Daily Claims: **${formatNumber(data.totalDailyClaims)}**`,
          `Net Gambling Profit: **${formatNumber((data.totalGamblingWon || 0) - (data.totalGamblingLost || 0))}**`,
        ].join("\n")
      )
      .setColor("#3498db")
      .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: false }))
      .setTimestamp();

    return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }

  if (interaction.commandName === "recharge") {
    if (!hasRole(interaction.member, ADMIN_ROLE_ID)) {
      return interaction.reply({
        content: `❌ You cannot use this command because you do not have the required role: ${mentionRole(ADMIN_ROLE_ID)}`,
        flags: MessageFlags.Ephemeral,
      });
    }

    const amount = interaction.options.getInteger("amount");
    const target = interaction.options.getUser("user");

    if (!target || target.bot) {
      return interaction.reply({ content: "❌ You must select a real user.", flags: MessageFlags.Ephemeral });
    }

    const newBalance = addCoins(target.id, amount);

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("🔋 Coins Recharged")
          .setDescription(
            [
              `✅ Added **${formatNumber(amount)}** coins to ${target}.`,
              `💰 ${target}'s new balance: **${formatNumber(newBalance)}** coins`,
              `👤 Recharged by: ${interaction.user}`,
            ].join("\n")
          )
          .setColor("#2ecc71")
          .setTimestamp(),
      ],
      flags: MessageFlags.Ephemeral,
    });
  }

  if (interaction.commandName === "daily") {
    if (interaction.channelId !== DAILY_COMMAND_CHANNEL_ID) {
      return interaction.reply({
        content: `❌ You can only use **/daily** in ${mentionChannel(DAILY_COMMAND_CHANNEL_ID)}.`,
        flags: MessageFlags.Ephemeral,
      });
    }

    const result = claimDaily(interaction.user.id);

    if (!result.ok) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("📅 Daily Reward")
            .setDescription(`You already claimed your daily reward.\nCome back in **${formatDuration(result.remaining)}**.`)
            .setColor("#e67e22")
            .setTimestamp(),
        ],
        flags: MessageFlags.Ephemeral,
      });
    }

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("📅 Daily Claimed!")
          .setDescription(
            [
              `💸 Reward: **${formatNumber(result.reward)}** coins`,
              `🔥 Streak: **${formatNumber(result.streak)}**`,
              `📦 Total /daily claims: **${formatNumber(result.totalClaims)}**`,
              `💰 New balance: **${formatNumber(result.balance)}** coins`,
            ].join("\n")
          )
          .setColor("#2ecc71")
          .setThumbnail(interaction.user.displayAvatarURL({ forceStatic: false }))
          .setTimestamp(),
      ],
      flags: MessageFlags.Ephemeral,
    });
  }

  if (interaction.commandName === "leaderboard") {
    return interaction.reply({
      embeds: [createLeaderboardHomeEmbed()],
      components: [createLeaderboardMenu()],
      flags: MessageFlags.Ephemeral,
    });
  }

  if (interaction.commandName === "coinflip") {
    if (interaction.channelId !== GAMBLING_COMMANDS_CHANNEL_ID) {
      return interaction.reply({
        content: `❌ You can only use **/coinflip** in ${mentionChannel(GAMBLING_COMMANDS_CHANNEL_ID)}.`,
        flags: MessageFlags.Ephemeral,
      });
    }

    const amount = interaction.options.getInteger("amount");
    const target = interaction.options.getUser("user");

    if (!target || target.bot) {
      return interaction.reply({ content: "❌ You must challenge a real user.", flags: MessageFlags.Ephemeral });
    }
    if (target.id === interaction.user.id) {
      return interaction.reply({ content: "❌ You cannot coinflip against yourself.", flags: MessageFlags.Ephemeral });
    }

    const challengerData = ensureEconomyUser(interaction.user.id);
    ensureEconomyUser(target.id);

    if (challengerData.coins < amount) {
      return interaction.reply({
        content: `❌ You do not have enough coins. You need **${formatNumber(amount)}** coins.`,
        flags: MessageFlags.Ephemeral,
      });
    }

    const requestChannel = client.channels.cache.get(COINFLIP_REQUEST_CHANNEL_ID);
    if (!requestChannel?.isTextBased()) {
      return interaction.reply({ content: "❌ Coinflip request channel not found.", flags: MessageFlags.Ephemeral });
    }

    const challengeId = `${interaction.user.id}_${target.id}_${Date.now()}`;
    pendingCoinflips.set(challengeId, {
      challengerId: interaction.user.id,
      targetId: target.id,
      amount,
      status: "pending",
      createdAt: now(),
    });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`coinflip_accept_${challengeId}`).setLabel("Accept").setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId(`coinflip_decline_${challengeId}`).setLabel("Decline").setStyle(ButtonStyle.Danger)
    );

    await requestChannel.send({
      content: `${mentionUser(target.id)}`,
      embeds: [
        new EmbedBuilder()
          .setTitle("🪙 New Coinflip Challenge")
          .setDescription(
            [
              `🎯 Challenger: ${mentionUser(interaction.user.id)}`,
              `🎯 Opponent: ${mentionUser(target.id)}`,
              `💸 Bet: **${formatNumber(amount)}** coins each`,
              "",
              `${mentionUser(target.id)}, do you accept this 50/50 coinflip?`,
            ].join("\n")
          )
          .setColor("#f1c40f")
          .setTimestamp(),
      ],
      components: [row],
      allowedMentions: { users: uniq([target.id]) },
    });

    setTimeout(() => {
      const challenge = pendingCoinflips.get(challengeId);
      if (!challenge || challenge.status !== "pending") return;
      challenge.status = "expired";
      saveEconomy();
    }, 5 * 60 * 1000);

    return interaction.reply({
      content: `✅ Coinflip request sent to ${target}. Check ${mentionChannel(COINFLIP_REQUEST_CHANNEL_ID)}.`,
      flags: MessageFlags.Ephemeral,
    });
  }

  if (interaction.commandName === "dice") {
    if (interaction.channelId !== GAMBLING_COMMANDS_CHANNEL_ID) {
      return interaction.reply({
        content: `❌ You can only use **/dice** in ${mentionChannel(GAMBLING_COMMANDS_CHANNEL_ID)}.`,
        flags: MessageFlags.Ephemeral,
      });
    }

    const amount = interaction.options.getInteger("amount");
    const userId = interaction.user.id;
    const userData = ensureEconomyUser(userId);

    if (userData.coins < amount) {
      return interaction.reply({ content: "❌ You do not have enough coins for this bet.", flags: MessageFlags.Ephemeral });
    }

    addCoins(userId, -amount);

    const playerRoll = randomInt(1, 6);
    const botRoll = randomInt(1, 6);

    if (playerRoll > botRoll) {
      addCoins(userId, amount * 2);
      recordGambleWin(userId, amount, "dice");

      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("🎲 Dice Result")
            .setDescription(
              [
                `You rolled: **${playerRoll}**`,
                `Dealer rolled: **${botRoll}**`,
                `🏆 You won **${formatNumber(amount)}** coins!`,
                `💰 New balance: **${formatNumber(getUserCoins(userId))}**`,
              ].join("\n")
            )
            .setColor("#2ecc71")
            .setTimestamp(),
        ],
        flags: MessageFlags.Ephemeral,
      });
    }

    if (playerRoll === botRoll) {
      // FIX: return the bet and track draw properly (no win/loss recorded, just played count)
      addCoins(userId, amount);
      recordGambleDraw(userId, "dice");

      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("🎲 Dice Result")
            .setDescription(
              [
                `You rolled: **${playerRoll}**`,
                `Dealer rolled: **${botRoll}**`,
                `🤝 Draw! Your bet was returned.`,
                `💰 Balance: **${formatNumber(getUserCoins(userId))}**`,
              ].join("\n")
            )
            .setColor("#f1c40f")
            .setTimestamp(),
        ],
        flags: MessageFlags.Ephemeral,
      });
    }

    recordGambleLoss(userId, amount, "dice");
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("🎲 Dice Result")
          .setDescription(
            [
              `You rolled: **${playerRoll}**`,
              `Dealer rolled: **${botRoll}**`,
              `💀 You lost **${formatNumber(amount)}** coins.`,
              `💰 New balance: **${formatNumber(getUserCoins(userId))}**`,
            ].join("\n")
          )
          .setColor("#e74c3c")
          .setTimestamp(),
      ],
      flags: MessageFlags.Ephemeral,
    });
  }

  if (interaction.commandName === "slots") {
    if (interaction.channelId !== GAMBLING_COMMANDS_CHANNEL_ID) {
      return interaction.reply({
        content: `❌ You can only use **/slots** in ${mentionChannel(GAMBLING_COMMANDS_CHANNEL_ID)}.`,
        flags: MessageFlags.Ephemeral,
      });
    }

    const amount = interaction.options.getInteger("amount");
    const userId = interaction.user.id;
    const userData = ensureEconomyUser(userId);

    if (userData.coins < amount) {
      return interaction.reply({ content: "❌ You do not have enough coins for this bet.", flags: MessageFlags.Ephemeral });
    }

    addCoins(userId, -amount);

    const symbols = ["🍒", "🍋", "🍇", "💎", "7️⃣", "⭐"];
    const roll = [
      symbols[randomInt(0, symbols.length - 1)],
      symbols[randomInt(0, symbols.length - 1)],
      symbols[randomInt(0, symbols.length - 1)],
    ];

    const isJackpot = Math.random() < JACKPOT_CHANCE;
    let multiplier = 0;
    let resultLabel = "No win";

    if (isJackpot) {
      multiplier = 10;
      resultLabel = "JACKPOT";
    } else if (roll[0] === roll[1] && roll[1] === roll[2]) {
      multiplier = 4;
      resultLabel = "Triple match";
    } else if (roll[0] === roll[1] || roll[1] === roll[2] || roll[0] === roll[2]) {
      multiplier = 1.8;
      resultLabel = "Double match";
    }

    if (multiplier > 0) {
      const payout = Math.floor(amount * multiplier);
      addCoins(userId, payout);
      recordGambleWin(userId, payout - amount, "slots");

      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("🎰 Slots Result")
            .setDescription(
              [
                `**${roll.join(" │ ")}**`,
                "",
                `✨ Result: **${resultLabel}**`,
                `💸 Payout: **${formatNumber(payout)}** coins`,
                `🏆 Profit: **${formatNumber(payout - amount)}** coins`,
                `💰 New balance: **${formatNumber(getUserCoins(userId))}**`,
              ].join("\n")
            )
            .setColor(isJackpot ? "#9b59b6" : "#2ecc71")
            .setTimestamp(),
        ],
        flags: MessageFlags.Ephemeral,
      });
    }

    recordGambleLoss(userId, amount, "slots");
    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("🎰 Slots Result")
          .setDescription(
            [
              `**${roll.join(" │ ")}**`,
              "",
              `💀 You lost **${formatNumber(amount)}** coins.`,
              `💰 New balance: **${formatNumber(getUserCoins(userId))}**`,
            ].join("\n")
          )
          .setColor("#e74c3c")
          .setTimestamp(),
      ],
      flags: MessageFlags.Ephemeral,
    });
  }

  if (interaction.commandName === "blackjack") {
    const amount = interaction.options.getInteger("amount");
    const userId = interaction.user.id;
    const userData = ensureEconomyUser(userId);

    if (userData.coins < amount) {
      return interaction.reply({ content: "❌ You do not have enough coins for this bet.", flags: MessageFlags.Ephemeral });
    }

    if (blackjackGames.has(userId)) {
      return interaction.reply({ content: "❌ You already have an active blackjack game.", flags: MessageFlags.Ephemeral });
    }

    addCoins(userId, -amount);

    const game = {
      bet: amount,
      player: [drawBlackjackCard(), drawBlackjackCard()],
      dealer: [drawBlackjackCard(), drawBlackjackCard()],
      createdAt: now(),
    };

    blackjackGames.set(userId, game);

    // FIX: use single variable reference instead of double ensureEconomyUser() call
    const bjUser = ensureEconomyUser(userId);
    bjUser.stats.blackjackPlayed = (bjUser.stats.blackjackPlayed || 0) + 1;
    saveEconomy();

    const playerValue = blackjackHandValue(game.player);
    const dealerValue = blackjackHandValue(game.dealer);

    if (playerValue === 21 && dealerValue === 21) {
      addCoins(userId, amount);
      blackjackGames.delete(userId);

      return interaction.reply({
        embeds: [
          createBlackjackEmbed(interaction.user, game, true, "🤝 Both hit blackjack. Your bet was returned.").setColor("#f1c40f"),
        ],
        flags: MessageFlags.Ephemeral,
      });
    }

    if (playerValue === 21) {
      const payout = Math.floor(amount * 2.5);
      addCoins(userId, payout);
      recordGambleWin(userId, payout - amount, "blackjack");
      blackjackGames.delete(userId);

      return interaction.reply({
        embeds: [
          createBlackjackEmbed(
            interaction.user,
            game,
            true,
            `🃏 Blackjack! You won ${formatNumber(payout - amount)} coins profit.`
          ).setColor("#2ecc71"),
        ],
        flags: MessageFlags.Ephemeral,
      });
    }

    return interaction.reply({
      embeds: [createBlackjackEmbed(interaction.user, game, false)],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId(`blackjack_hit_${userId}`).setLabel("Hit").setStyle(ButtonStyle.Primary),
          new ButtonBuilder().setCustomId(`blackjack_stand_${userId}`).setLabel("Stand").setStyle(ButtonStyle.Success)
        ),
      ],
      flags: MessageFlags.Ephemeral,
    });
  }

  if (interaction.commandName === "vcustomer") {
    if (!interaction.inGuild()) {
      const proof = interaction.options.getAttachment("proof");
      if (!proof?.contentType?.startsWith("image/")) {
        return interaction.reply({
          content: "❌ Please attach a valid image file (jpg, png, gif, etc.)",
          flags: MessageFlags.Ephemeral,
        });
      }

      try {
        const verifyChannel = client.channels.cache.get(VERIFICATION_CHANNEL_ID);
        if (!verifyChannel?.isTextBased()) {
          return interaction.reply({ content: "❌ Verification channel not found. Contact staff.", flags: MessageFlags.Ephemeral });
        }

        await verifyChannel.send({
          content: `**New customer proof from ${interaction.user.tag} (${interaction.user.id})**\nPlease verify!`,
          files: [proof.url],
        });

        return interaction.reply({
          content: "✅ Thank you! Your proof was sent to staff for verification.\nWe will contact you soon.",
          flags: MessageFlags.Ephemeral,
        });
      } catch (err) {
        console.error("[vcustomer]", err?.message || err);
        return interaction.reply({ content: "❌ Something went wrong while sending the proof. Contact staff.", flags: MessageFlags.Ephemeral });
      }
    }

    return interaction.reply({ content: "This command can only be used in DM with the bot.", flags: MessageFlags.Ephemeral });
  }

  if (interaction.commandName === "giveaway") {
    if (!hasRole(interaction.member, ADMIN_ROLE_ID)) {
      return interaction.reply({ content: "❌ You do not have permission to host a giveaway.", flags: MessageFlags.Ephemeral });
    }

    const duration = interaction.options.getInteger("duration");
    const prize = interaction.options.getString("prize");
    const description = interaction.options.getString("description");
    const endTime = Date.now() + duration * 60 * 1000;

    const embed = new EmbedBuilder()
      .setTitle(`🎉 Giveaway: ${prize}`)
      .setDescription(
        `${description}\n\n**Entries:** 0\n**Ends at:** <t:${Math.floor(endTime / 1000)}:R>\n**Hosted by:** ${interaction.user}`
      )
      .setColor("#FFD700")
      .setThumbnail(ticketGif)
      .setTimestamp(endTime)
      .setFooter({ text: "Click the button to enter! Everyone has equal chances." });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("enter_giveaway").setLabel("Enter (0)").setStyle(ButtonStyle.Primary).setEmoji("🎉")
    );

    const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

    giveaways.set(message.id, {
      entrants: new Set(),
      endTime,
      prize,
      description,
      host: interaction.user,
      channel: interaction.channel,
      message,
    });

    setTimeout(() => endGiveaway(message.id), duration * 60 * 1000);
    return;
  }

  if (interaction.commandName === "drop") {
    if (!hasRole(interaction.member, ADMIN_ROLE_ID)) {
      return interaction.reply({ content: "❌ You do not have permission to start a drop.", flags: MessageFlags.Ephemeral });
    }

    // FIX: check and set dropActive BEFORE any async work to prevent concurrent drops
    if (dropActive) {
      return interaction.reply({ content: "❌ A drop is already active.", flags: MessageFlags.Ephemeral });
    }
    dropActive = true;
    dropWinner = null;

    const dropChannel = client.channels.cache.get(DROP_CHANNEL_ID);
    if (!dropChannel?.isTextBased()) {
      dropActive = false;
      return interaction.reply({ content: "❌ Drop channel not found.", flags: MessageFlags.Ephemeral });
    }

    await interaction.reply({ content: "✅ Drop started!", flags: MessageFlags.Ephemeral });

    for (let i = 10; i >= 1; i--) {
      await dropChannel.send(`${i}`).catch(() => {});
      await delay(1000);
    }

    await dropChannel.send("0").catch(() => {});
    await dropChannel.send("First one to DM <@679166959316762629> wins!").catch(() => {});

    setTimeout(() => {
      dropActive = false;
      dropWinner = null;
    }, 10 * 60 * 1000);

    return;
  }

  if (interaction.commandName === "stats") {
    const target = interaction.options.getUser("user") || interaction.user;
    const isSelf = target.id === interaction.user.id;

    // Only admins can look up other people's stats
    if (!isSelf && !hasRole(interaction.member, ADMIN_ROLE_ID)) {
      return interaction.reply({
        content: "❌ You can only view your own stats.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const data = ensureEconomyUser(target.id);
    const s = data.stats || {};

    function winRate(won, played) {
      if (!played) return "N/A";
      return `${Math.round((won / played) * 100)}%`;
    }

    function statLine(emoji, label, played, won) {
      const lost = (played || 0) - (won || 0);
      const rate = winRate(won, played);
      return `${emoji} **${label}** - ${formatNumber(played)} games | ${formatNumber(won)}W / ${formatNumber(lost)}L | Win rate: ${rate}`;
    }

    const netProfit = (data.totalGamblingWon || 0) - (data.totalGamblingLost || 0);
    const profitColor = netProfit >= 0 ? "#2ecc71" : "#e74c3c";

    const embed = new EmbedBuilder()
      .setTitle(`📊 ${isSelf ? "Your" : `${target.username}'s`} Stats`)
      .setColor(profitColor)
      .setThumbnail(target.displayAvatarURL({ forceStatic: false }))
      .addFields(
        {
          name: "💰 Economy",
          value: [
            `Balance: **${formatNumber(data.coins)}** coins`,
            `Daily Streak: **${formatNumber(data.dailyStreak)}** 🔥`,
            `Total /daily Claims: **${formatNumber(data.totalDailyClaims)}**`,
          ].join("\n"),
          inline: false,
        },
        {
          name: "🎲 Gambling Overview",
          value: [
            `Total Won: **${formatNumber(data.totalGamblingWon || 0)}** coins`,
            `Total Lost: **${formatNumber(data.totalGamblingLost || 0)}** coins`,
            `Net Profit: **${netProfit >= 0 ? "+" : ""}${formatNumber(netProfit)}** coins`,
          ].join("\n"),
          inline: false,
        },
        {
          name: "🎮 Game Breakdown",
          value: [
            statLine("🪙", "Coinflip", s.coinflipPlayed, s.coinflipWon),
            statLine("🎲", "Dice", s.dicePlayed, s.diceWon),
            statLine("🎰", "Slots", s.slotsPlayed, s.slotsWon),
            statLine("🃏", "Blackjack", s.blackjackPlayed, s.blackjackWon),
          ].join("\n"),
          inline: false,
        }
      )
      .setFooter({ text: `303 Economy • ${isSelf ? "Only visible to you" : `Requested by ${interaction.user.tag}`}` })
      .setTimestamp();

    return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }

  if (interaction.commandName === "setavatar") {
    const OWNER_ID = "679166959316762629";
    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({
        content: "❌ Only the bot owner can use this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const url = interaction.options.getString("url");

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    try {
      await client.user.setAvatar(url);
      console.log(`[setavatar] Avatar changed to ${url} by ${interaction.user.tag}`);
      return interaction.editReply({
        content: `✅ Avatar updated successfully!\n${url}`,
      });
    } catch (err) {
      console.error("[setavatar]", err?.message || err);
      const reason =
        err?.message?.includes("cooldown") || err?.code === 50035
          ? "Discord rate limit hit - you can only change the avatar twice per hour."
          : err?.message || "Unknown error.";
      return interaction.editReply({ content: `❌ Failed to set avatar: ${reason}` });
    }
  }

  if (interaction.commandName === "resetstats") {
    if (!hasRole(interaction.member, ADMIN_ROLE_ID)) {
      return interaction.reply({
        content: "❌ You do not have permission to use this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const target = interaction.options.getUser("user");
    const type = interaction.options.getString("type");

    if (!target || target.bot) {
      return interaction.reply({
        content: "❌ You must select a real user.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const user = ensureEconomyUser(target.id);

    const emptyStats = {
      coinflipPlayed: 0,
      dicePlayed: 0,
      slotsPlayed: 0,
      blackjackPlayed: 0,
      coinflipWon: 0,
      diceWon: 0,
      slotsWon: 0,
      blackjackWon: 0,
    };

    let resetDescription = "";

    if (type === "gambling" || type === "all") {
      user.totalGamblingWon = 0;
      user.totalGamblingLost = 0;
      user.stats = { ...emptyStats };
      resetDescription += "🎲 Gambling stats (wins, losses, game counts) reset to zero.\n";
    }

    if (type === "balance" || type === "all") {
      user.coins = STARTING_COINS;
      resetDescription += `💰 Balance reset to **${formatNumber(STARTING_COINS)}** coins.\n`;
    }

    if (type === "daily" || type === "all") {
      user.dailyStreak = 0;
      user.totalDailyClaims = 0;
      user.lastDailyAt = 0;
      resetDescription += "📅 Daily streak, claim count, and cooldown reset.\n";
    }

    saveEconomy();

    const embed = new EmbedBuilder()
      .setTitle("🔄 Stats Reset")
      .setDescription(
        [
          `**User:** ${target} (${target.tag})`,
          `**Reset type:** ${type}`,
          "",
          resetDescription.trim(),
        ].join("\n")
      )
      .setColor("#e67e22")
      .setThumbnail(target.displayAvatarURL({ forceStatic: false }))
      .setFooter({ text: `Reset by ${interaction.user.tag}` })
      .setTimestamp();

    return interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  }

  if (interaction.commandName === "poll") {
    const question = interaction.options.getString("question");
    const maxchoices = interaction.options.getInteger("maxchoices") || 1;
    const text =
      interaction.options.getString("text") ||
      "Settings: " + (maxchoices === 1 ? "Single choice" : `${maxchoices} choices allowed`);

    const answers = [];
    for (let i = 1; i <= 6; i++) {
      const answer = interaction.options.getString(`answer${i}`);
      if (answer) answers.push(answer);
    }

    if (answers.length < 2) {
      return interaction.reply({ content: "❌ At least two answers are required.", flags: MessageFlags.Ephemeral });
    }

    const embed = new EmbedBuilder()
      .setTitle(question)
      .setDescription(text)
      .setColor("#00FF00")
      .setFooter({ text: `Poll ID: ${interaction.id}` });

    // FIX: build vote button rows respecting Discord's 5-component-per-row limit
    const voteRows = buildPollButtonRows({ answers, voteCounts: new Array(answers.length).fill(0) });

    const infoRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("poll_manage_votes")
        .setLabel("Manage your votes")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("poll_view_participants")
        .setLabel("Participants (0)")
        .setStyle(ButtonStyle.Secondary)
    );

    const message = await interaction.reply({
      embeds: [embed],
      components: [...voteRows, infoRow],
      fetchReply: true,
    });

    polls.set(message.id, {
      question,
      text,
      maxchoices,
      answers,
      votes: new Map(),
      voteCounts: new Array(answers.length).fill(0),
    });
    return;
  }
}

// FIX: helper that splits poll vote buttons into rows of max 5, satisfying Discord's limit
function buildPollButtonRows(poll) {
  const rows = [];
  let currentRow = new ActionRowBuilder();
  let count = 0;

  poll.answers.forEach((ans, index) => {
    if (count === 5) {
      rows.push(currentRow);
      currentRow = new ActionRowBuilder();
      count = 0;
    }
    const label = `${String.fromCharCode(65 + index)} ${ans} (${poll.voteCounts[index]})`.slice(0, 80);
    currentRow.addComponents(
      new ButtonBuilder()
        .setCustomId(`poll_vote_${index}`)
        .setLabel(label)
        .setStyle(ButtonStyle.Primary)
    );
    count++;
  });

  if (count > 0) rows.push(currentRow);
  return rows;
}

// ===================== ERROR HANDLERS =====================
client.on("error", (e) => {
  console.error("[client:error]", e?.message || e);
});

process.on("unhandledRejection", (e) => {
  console.error("[unhandledRejection]", e);
});

process.on("uncaughtException", (e) => {
  console.error("[uncaughtException]", e);
  // Do NOT call process.exit here in production - let the process manager restart if needed
});

// ===================== LOGIN =====================
client.login(TOKEN);
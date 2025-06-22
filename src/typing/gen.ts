export type int = number

export type int64 = number

export type float = number

export type float64 = number

export type Time = string

export type time = string

export type MaybeTime = time | Date | number | undefined | null

export type Pet = {
	id: number 
	category: Category 
	name: string // doggie
	photoUrls: string[] 
	tags: Tag[] 
	status: 'available' | 'pending' | 'sold' 
}

export type Tag = {
	id: number 
	name: string 
}

export type RevoltConfig = {
	revolt: string 
	features: unknown 
	ws: string 
	app: string 
	vapid: string 
	build: unknown 
}

export type Category = {
	id: string 
	title: string 
	channels: string[] 
}

export type RevoltFeatures = {
	captcha: unknown 
	email: boolean 
	invite_only: boolean 
	autumn: unknown 
	january: unknown 
	voso: unknown 
}

export type CaptchaFeature = {
	enabled: boolean 
	key: string 
}

export type Feature = {
	enabled: boolean 
	url: string 
}

export type VoiceFeature = {
	enabled: boolean 
	url: string 
	ws: string 
}

export type BuildInformation = {
	commit_sha: string 
	commit_timestamp: string 
	semver: string 
	origin_url: string 
	timestamp: string 
}

export type Error = any
export type User = {
	_id: string 
	username: string 
	discriminator: string 
	display_name: string 
	avatar: unknown 
	relations: Relationship[] 
	badges: number 
	status: unknown 
	flags: number 
	privileged: boolean 
	bot: unknown 
	relationship: unknown 
	online: boolean 
}

export type File = {
	_id: string 
	tag: string 
	filename: string 
	metadata: unknown 
	content_type: string 
	size: number 
	deleted: boolean 
	reported: boolean 
	message_id: string 
	user_id: string 
	server_id: string 
	object_id: string 
}

export type Metadata = any
export type Relationship = {
	_id: string 
	status: unknown 
}

export type RelationshipStatus = 'None' | 'User' | 'Friend' | 'Outgoing' | 'Incoming' | 'Blocked' | 'BlockedOther'
export type UserStatus = {
	text: string 
	presence: unknown 
}

export type Presence = 'Online' | 'Idle' | 'Focus' | 'Busy' | 'Invisible'
export type BotInformation = {
	owner: string 
}

export type Id = string
export type FlagResponse = {
	flags: number 
}

export type DataEditUser = {
	display_name: string 
	avatar: string 
	status: unknown 
	profile: unknown 
	badges: number 
	flags: number 
	remove: FieldsUser[] 
}

export type DataUserProfile = {
	content: string 
	background: string 
}

export type FieldsUser = 'Avatar' | 'StatusText' | 'StatusPresence' | 'ProfileContent' | 'ProfileBackground' | 'DisplayName' | 'Internal'
export type DataChangeUsername = {
	username: string 
	password: string 
}

export type UserProfile = {
	content: string 
	background: unknown 
}

export type Channel = any
export type OverrideField = {
	a: number 
	d: number 
}

export type MutualResponse = {
	users: string[] 
	servers: string[] 
}

export type DataSendFriendRequest = {
	username: string 
}

export type BotWithUserResponse = {
	user: User 
	_id: string 
	owner: string 
	token: string 
	public: boolean 
	analytics: boolean 
	discoverable: boolean 
	interactions_url: string 
	terms_of_service_url: string 
	privacy_policy_url: string 
	flags: number 
}

export type DataCreateBot = {
	name: string 
}

export type InviteBotDestination = {

}

export type PublicBot = {
	_id: string 
	username: string 
	avatar: string 
	description: string 
}

export type FetchBotResponse = {
	bot: unknown 
	user: unknown 
}

export type Bot = {
	_id: string 
	owner: string 
	token: string 
	public: boolean 
	analytics: boolean 
	discoverable: boolean 
	interactions_url: string 
	terms_of_service_url: string 
	privacy_policy_url: string 
	flags: number 
}

export type OwnedBotsResponse = {
	bots: Bot[] 
	users: User[] 
}

export type DataEditBot = {
	name: string 
	public: boolean 
	analytics: boolean 
	interactions_url: string 
	remove: FieldsBot[] 
}

export type FieldsBot = 'Token' | 'InteractionsURL'
export type DataEditChannel = {
	name: string 
	description: string 
	owner: string 
	icon: string 
	nsfw: boolean 
	archived: boolean 
	remove: FieldsChannel[] 
}

export type FieldsChannel = 'Description' | 'Icon' | 'DefaultPermissions'
export type Invite = any
export type Message = {
	_id: string 
	nonce: string 
	channel: string 
	author: string 
	user: unknown 
	member: unknown 
	webhook: unknown 
	content: string 
	system: unknown 
	attachments: File[] 
	edited: unknown 
	embeds: Embed[] 
	mentions: string[] 
	replies: string[] 
	reactions: unknown 
	interactions: unknown 
	masquerade: unknown 
	pinned: boolean 
	flags: number 
}

export type Member = {
	_id: unknown 
	joined_at: unknown 
	nickname: string 
	avatar: unknown 
	roles: string[] 
	timeout: unknown 
}

export type MemberCompositeKey = {
	server: string 
	user: string 
}

export type ISO8601Timestamp = string
export type MessageWebhook = {
	name: string 
	avatar: string 
}

export type SystemMessage = any
export type Embed = any
export type Special = any
export type LightspeedType = 'Channel'
export type TwitchType = 'Channel' | 'Video' | 'Clip'
export type BandcampType = 'Album' | 'Track'
export type Image = {
	url: string 
	width: number 
	height: number 
	size: unknown 
}

export type ImageSize = 'Large' | 'Preview'
export type Video = {
	url: string 
	width: number 
	height: number 
}

export type Interactions = {
	reactions: string[] 
	restrict_reactions: boolean 
}

export type Masquerade = {
	name: string 
	avatar: string 
	colour: string 
}

export type DataMessageSend = {
	nonce: string 
	content: string 
	attachments: string[] 
	replies: ReplyIntent[] 
	embeds: SendableEmbed[] 
	masquerade: unknown 
	interactions: unknown 
	flags: number 
}

export type ReplyIntent = {
	id: string 
	mention: boolean 
	fail_if_not_exists: boolean 
}

export type SendableEmbed = {
	icon_url: string 
	url: string 
	title: string 
	description: string 
	media: string 
	colour: string 
}

export type BulkMessageResponse = {

}

export type MessageSort = 'Relevance' | 'Latest' | 'Oldest'
export type DataMessageSearch = {
	query: string 
	pinned: boolean 
	limit: number 
	before: string 
	after: string 
	sort: unknown 
	include_users: boolean 
}

export type DataEditMessage = {
	content: string 
	embeds: SendableEmbed[] 
}

export type OptionsBulkDelete = {
	ids: string[] 
}

export type DataCreateGroup = {
	name: string 
	description: string 
	icon: string 
	users: string[] 
	nsfw: boolean 
}

export type LegacyCreateVoiceUserResponse = {
	token: string 
}

export type DataSetRolePermissions = {
	permissions: unknown 
}

export type Override = {
	allow: number 
	deny: number 
}

export type DataDefaultChannelPermissions = {

}

export type Webhook = {
	id: string 
	name: string 
	avatar: unknown 
	creator_id: string 
	channel_id: string 
	permissions: number 
	token: string 
}

export type CreateWebhookBody = {
	name: string 
	avatar: string 
}

export type CreateServerLegacyResponse = {
	server: unknown 
	channels: Channel[] 
}

export type Server = {
	_id: string 
	owner: string 
	name: string 
	description: string 
	channels: string[] 
	categories: Category[] 
	system_messages: unknown 
	roles: unknown 
	default_permissions: number 
	icon: unknown 
	banner: unknown 
	flags: number 
	nsfw: boolean 
	analytics: boolean 
	discoverable: boolean 
}

export type SystemMessageChannels = {
	user_joined: string 
	user_left: string 
	user_kicked: string 
	user_banned: string 
}

export type Role = {
	name: string 
	permissions: unknown 
	colour: string 
	hoist: boolean 
	rank: number 
}

export type DataCreateServer = {
	name: string 
	description: string 
	nsfw: boolean 
}

export type FetchServerResponse = {

}

export type DataEditServer = {
	name: string 
	description: string 
	icon: string 
	banner: string 
	categories: Category[] 
	system_messages: unknown 
	flags: number 
	discoverable: boolean 
	analytics: boolean 
	remove: FieldsServer[] 
}

export type FieldsServer = 'Description' | 'Categories' | 'SystemMessages' | 'Icon' | 'Banner'
export type DataCreateServerChannel = {
	type: unknown 
	name: string 
	description: string 
	nsfw: boolean 
}

export type LegacyServerChannelType = 'Text' | 'Voice'
export type AllMemberResponse = {
	members: Member[] 
	users: User[] 
}

export type MemberResponse = {

}

export type DataMemberEdit = {
	nickname: string 
	avatar: string 
	roles: string[] 
	timeout: unknown 
	remove: FieldsMember[] 
}

export type FieldsMember = 'Nickname' | 'Avatar' | 'Roles' | 'Timeout'
export type MemberQueryResponse = {
	members: Member[] 
	users: User[] 
}

export type ServerBan = {
	_id: unknown 
	reason: string 
}

export type DataBanCreate = {
	reason: string 
}

export type BanListResult = {
	users: BannedUser[] 
	bans: ServerBan[] 
}

export type BannedUser = {
	_id: string 
	username: string 
	discriminator: string 
	avatar: unknown 
}

export type NewRoleResponse = {
	id: string 
	role: unknown 
}

export type DataCreateRole = {
	name: string 
	rank: number 
}

export type DataEditRole = {
	name: string 
	colour: string 
	hoist: boolean 
	rank: number 
	remove: FieldsRole[] 
}

export type FieldsRole = 'Colour'
export type DataSetServerRolePermission = {
	permissions: unknown 
}

export type DataPermissionsValue = {
	permissions: number 
}

export type Emoji = {
	_id: string 
	parent: unknown 
	creator_id: string 
	name: string 
	animated: boolean 
	nsfw: boolean 
}

export type EmojiParent = any
export type InviteResponse = any
export type InviteJoinResponse = any
export type DataCreateEmoji = {
	name: string 
	parent: unknown 
	nsfw: boolean 
}

export type DataReportContent = {
	content: unknown 
	additional_context: string 
}

export type ReportedContent = any
export type ContentReportReason = 'NoneSpecified' | 'Illegal' | 'IllegalGoods' | 'IllegalExtortion' | 'IllegalPornography' | 'IllegalHacking' | 'ExtremeViolence' | 'PromotesHarm' | 'UnsolicitedSpam' | 'Raid' | 'SpamAbuse' | 'ScamsFraud' | 'Malware' | 'Harassment'
export type UserReportReason = 'NoneSpecified' | 'UnsolicitedSpam' | 'SpamAbuse' | 'InappropriateProfile' | 'Impersonation' | 'BanEvasion' | 'Underage'
export type AuthifierError = any
export type DataCreateAccount = {
	email: string 
	password: string 
	invite: string 
	captcha: string 
}

export type DataResendVerification = {
	email: string 
	captcha: string 
}

export type DataAccountDeletion = {
	token: string 
}

export type AccountInfo = {
	_id: string 
	email: string 
}

export type DataChangePassword = {
	password: string 
	current_password: string 
}

export type DataChangeEmail = {
	email: string 
	current_password: string 
}

export type ResponseVerify = {

}

export type MFATicket = {
	_id: string 
	account_id: string 
	token: string 
	validated: boolean 
	authorised: boolean 
	last_totp_code: string 
}

export type DataPasswordReset = {
	token: string 
	password: string 
	remove_sessions: boolean 
}

export type DataSendPasswordReset = {
	email: string 
	captcha: string 
}

export type ResponseLogin = any
export type WebPushSubscription = {
	endpoint: string 
	p256dh: string 
	auth: string 
}

export type MFAMethod = 'Password' | 'Recovery' | 'Totp'
export type DataLogin = {

}

export type MFAResponse = {

}

export type SessionInfo = {
	_id: string 
	name: string 
}

export type DataEditSession = {
	friendly_name: string 
}

export type MultiFactorStatus = {
	email_otp: boolean 
	trusted_handover: boolean 
	email_mfa: boolean 
	totp_mfa: boolean 
	security_key_mfa: boolean 
	recovery_active: boolean 
}

export type ResponseTotpSecret = {
	secret: string 
}

export type DataHello = {
	onboarding: boolean 
}

export type DataOnboard = {
	username: string 
}

export type OptionsFetchSettings = {
	keys: string[] 
}

export type ChannelUnread = {
	_id: unknown 
	last_id: string 
	mentions: string[] 
}

export type ChannelCompositeKey = {
	channel: string 
	user: string 
}

export type DataEditWebhook = {
	name: string 
	avatar: string 
	permissions: number 
	remove: FieldsWebhook[] 
}

export type FieldsWebhook = 'Avatar'
export type ResponseWebhook = {
	id: string 
	name: string 
	avatar: string 
	channel_id: string 
	permissions: number 
}


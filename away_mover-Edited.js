/**
 * Forum:  https://forum.sinusbot.com/resources/away-mover.179/
 * GitHub: https://github.com/irgendwr/sinusbot-scripts
 */

/** Requests:
* Move on Mic disabled
* + move back on unmute/enable/undeafen
* Config msgs per move
*BUG: Idle time <2 min seems to be broken
*
*/

registerPlugin({
    name: 'AFK mover (Away/Mute/Deaf/Idle)',
    version: '2.4.1',
    description: 'A fork of the original by Jonas Bögle (irgendwr) with better notifications. Moves clients that are set as away, have their speakers/mic muted or are idle to a specified channel',
    author: 'Arjan Dob (arriej)',
    vars: [
        /*** general ***/
        {
            name: 'afkChannel',
            title: 'Select your AFK Channel',
            type: 'channel'
        },

        /*** away ***/
        /***Enable Away move option ***/
        {
            name: 'awayEnabled',
            title: 'Away - Move users who set themselves as away',
            type: 'checkbox'
        },
        /*** Inore servergroups on away ***/
        {
            name: 'awaySgBlacklist',
            title: 'Ignore users with these server group(s):',
            type: 'array',
            vars: [{
                name: 'servergroup',
                title: 'Servergroup',
                type: 'number'
            }],
            indent: 3,
            conditions: [{ field: 'awayEnabled', value: true }]
        },
        /*** Apllies to what channel?  ***/
        {
            name: 'awayChannelIgnoreType',
            title: 'Should this only apply to certain channels?',
            type: 'select',
            options: [
                'No, check every channel.',
                'Yes, whitelist the channels below.',
                'Yes, blacklist the channels below.'
            ],
            indent: 3,
            conditions: [{ field: 'awayEnabled', value: true }]
        },
        /*** Ignore selected channels ***/
        {
            name: 'awayChannelList',
            title: 'Channels:',
            type: 'array',
            vars: [{
                name: 'channel',
                title: 'Channel',
                type: 'channel'
            }],
            indent: 3,
            conditions: [{ field: 'awayEnabled', value: true }]
        },
        /*** Move Delay  ***/
        {
            name: 'awayDelay',
            title: 'Delay (in seconds)',
            type: 'number',
            indent: 3,
            conditions: [{ field: 'awayEnabled', value: true }]
        },
        /*** Move back when back ***/
        {
            name: 'awayMoveBack',
            title: 'Move users back',
            type: 'checkbox',
            indent: 3,
            conditions: [{ field: 'awayEnabled', value: true }]
        },
        /*** Away notifications ***/
        /*** Enable notifications for away section ***/
        {
            name: 'awaynotify',
            title: 'Enable Away notifications',
            type: 'checkbox',
            indent: 3,
            conditions: [{ field: 'awayEnabled', value: true }]
        },
        /*** How should a client be notified ***/
        {
            name: 'awaynotifyType',
            title: 'How should client be notified?',
            type: 'select',
            options: [ 'disabled' 'chat', 'poke' ],
            indent: 4,
            conditions: [{ field: 'awaynotify', value: true }]
        },
        /*** Notification msgs ***/
        {
            name: 'awaynotifyText',
            title: 'Notification message',
            type: 'string',
            placeholder: 'You were moved to the afk channel because you are away.',
            indent: 4,
            conditions: [{ field: 'awaynotify', value: true }]
        },
        /*** mute ***/
        /*** Enable move on mute ***/
        {
            name: 'muteEnabled',
            title: 'Mute - Move muted clients',
            type: 'checkbox'
        },
        /*** move back on unmute ***/
        {
            name: 'muteMoveBack',
            title: 'Move users back',
            type: 'checkbox',
            indent: 3,
            conditions: [{ field: 'muteEnabled', value: true }]
        },
        {
            name: 'muteSgBlacklist',
            title: 'Ignore users with these servergroups:',
            type: 'array',
            vars: [{
                name: 'servergroup',
                title: 'Servergroup',
                type: 'number'
            }],
            indent: 3,
            conditions: [{ field: 'muteEnabled', value: true }]
        },
        {
            name: 'muteChannelIgnoreType',
            title: 'Should this only apply to certain channels?',
            type: 'select',
            options: [
                'No, check every channel.',
                'Yes, whitelist the channels below.',
                'Yes, blacklist the channels below.'
            ],
            indent: 3,
            conditions: [{ field: 'muteEnabled', value: true }]
        },
        {
            name: 'muteChannelList',
            title: 'Channels:',
            type: 'array',
            vars: [{
                name: 'channel',
                title: 'Channel',
                type: 'channel'
            }],
            indent: 3,
            conditions: [{ field: 'muteEnabled', value: true }]
        },
        {
            name: 'muteDelay',
            title: 'Delay (in seconds)',
            type: 'number',
            indent: 3,
            conditions: [{ field: 'muteEnabled', value: true }]
        },
        /*** Mute notifications ***/
        /*** Enable notifications for Mute section ***/
        {
            name: 'mutenotify',
            title: 'Enable mute notifications',
            type: 'checkbox',
            indent: 3,
            conditions: [{ field: 'muteEnabled', value: true }]
        },
        /*** How should a client be notified ***/
        {
            name: 'mutenotifyType',
            title: 'How should client be notified?',
            type: 'select',
            options: [ 'chat', 'poke' ],
            indent: 4,
            conditions: [{ field: 'mutenotify', value: true }]
        },
        /*** Notification msgs ***/
        {
            name: 'mutenotifyText',
            title: 'Notification message',
            type: 'string',
            placeholder: 'You were moved to the afk channel because you muted your self.',
            indent: 4,
            conditions: [{ field: 'mutenotify', value: true }]
        },
        /*** deaf ***/
        {
            name: 'deafEnabled',
            title: 'Deafen - Move users who deactivate their speaker',
            type: 'checkbox'
        },
        {
            name: 'deafMoveBack',
            title: 'Move users back',
            type: 'checkbox',
            indent: 3,
            conditions: [{ field: 'deafEnabled', value: true }]
        },
        {
            name: 'deafSgBlacklist',
            title: 'Ignore users with these servergroups:',
            type: 'array',
            vars: [{
                name: 'servergroup',
                title: 'Servergroup',
                type: 'number'
            }],
            indent: 3,
            conditions: [{ field: 'deafEnabled', value: true }]
        },
        {
            name: 'deafChannelIgnoreType',
            title: 'Should this only apply to certain channels?',
            type: 'select',
            options: [
                'No, check every channel.',
                'Yes, whitelist the channels below.',
                'Yes, blacklist the channels below.'
            ],
            indent: 3,
            conditions: [{ field: 'deafEnabled', value: true }]
        },
        {
            name: 'deafChannelList',
            title: 'Channels:',
            type: 'array',
            vars: [{
                name: 'channel',
                title: 'Channel',
                type: 'channel'
            }],
            indent: 3,
            conditions: [{ field: 'deafEnabled', value: true }]
        },
        {
            name: 'deafDelay',
            title: 'Delay (in seconds)',
            type: 'number',
            indent: 3,
            conditions: [{ field: 'deafEnabled', value: true }]
        },
        /*** Deafen notifications ***/
        /*** Enable notifications for Deafen section ***/
        {
            name: 'deafnotify',
            title: 'Enable deafen notifications',
            type: 'checkbox',
            indent: 3,
            conditions: [{ field: 'deafEnabled', value: true }]
        },
        /*** How should a client be notified ***/
        {
            name: 'deafnotifyType',
            title: 'How should client be notified?',
            type: 'select',
            options: [ 'chat', 'poke' ],
            indent: 4,
            conditions: [{ field: 'deafnotify', value: true }]
        },
        /*** Notification msgs ***/
        {
            name: 'deafnotifyText',
            title: 'Notification message',
            type: 'string',
            placeholder: 'You were moved to the afk channel, reason: %reason%',
            indent: 4,
            conditions: [{ field: 'deafnotify', value: true }]
        },

        /*** idle ***/
        {
            name: 'idleEnabled',
            title: 'Idle - Move users who are idle for too long',
            type: 'checkbox'
        },
        {
            name: 'idleSgBlacklist',
            title: 'Ignore users with these servergroups:',
            type: 'array',
            vars: [{
                name: 'servergroup',
                title: 'Servergroup',
                type: 'number'
            }],
            indent: 3,
            conditions: [{ field: 'idleEnabled', value: true }]
        },
        {
            name: 'idleChannelIgnoreType',
            title: 'Should this only apply to certain channels?',
            type: 'select',
            options: [
                'No, check every channel.',
                'Yes, whitelist the channels below.',
                'Yes, blacklist the channels below.'
            ],
            indent: 3,
            conditions: [{ field: 'idleEnabled', value: true }]
        },
        {
            name: 'idleChannelList',
            title: 'Channels:',
            type: 'array',
            vars: [{
                name: 'channel',
                title: 'Channel',
                type: 'channel'
            }],
            indent: 3,
            conditions: [{ field: 'idleEnabled', value: true }]
        },
        {
            name: 'idleThreshold',
            title: 'How long are people allowed to be idle? (in minutes, don\'t use small values!)',
            type: 'number',
            indent: 3,
            conditions: [{ field: 'idleEnabled', value: true }]
        },
        /*** Idle notifications ***/
        /*** Enable notifications for Idle section ***/
        {
            name: 'idlenotify',
            title: 'Enable idle notifications',
            type: 'checkbox',
            indent: 3,
            conditions: [{ field: 'idleEnabled', value: true }]
        },
        /*** How should a client be notified ***/
        {
            name: 'idlenotifyType',
            title: 'How should client be notified?',
            type: 'select',
            options: [ 'chat', 'poke' ],
            indent: 4,
            conditions: [{ field: 'idlenotify', value: true }]
        },
        /*** Notification msgs ***/
        {
            name: 'idlenotifyText',
            title: 'Notification message',
            type: 'string',
            placeholder: 'You were moved to the afk channel because you were idle for 30 minutes',
            indent: 4,
            conditions: [{ field: 'idlenotify', value: true }]
        },
        /*** How should a client be notified ***/
        {
            name: 'preidlenotifyType',
            title: 'How should client be notified?',
            type: 'select',
            options: [ 'chat', 'poke' ],
            indent: 4,
            conditions: [{ field: 'idlenotify', value: true }]
        },
        /*** Notification msgs ***/
        {
            name: 'preidlenotifyText',
            title: 'Notification message',
            type: 'string',
            placeholder: 'You were moved to the afk channel because you were idle for 30 minutes',
            indent: 4,
            conditions: [{ field: 'idlenotify', value: true }]
        },
    ]
}, function (sinusbot, config, info) {

    // include modules
    var event = require('event')
    var engine = require('engine')
    var backend = require('backend')

    // set default config values
    config.awayMoveBack = config.awayMoveBack || false
    config.awayDelay = config.awayDelay || 0
    config.awaynotifyType = config.awaynotifyType || 0
    config.awaynotifyText = config.awaynotifyText && config.awaynotifyText != '' ? config.awaynotifyText : 'You were moved to the AFK channel because of your away status.'
    config.muteMoveBack = config.muteMoveBack || false
    config.muteDelay = config.muteDelay || 0
    config.mutenotifyType = config.mutenotifyType || 0
    config.mutenotifyText = config.mutenotifyText && config.mutenotifyText != '' ? config.mutenotifyText : 'You were moved to the AFK channel because you are muted.'
    config.deafMoveBack = config.deafMoveBack || false
    config.deafDelay = config.deafDelay || 0
    config.deafnotifyType = config.deafnotifyType || 0
    config.deafnotifyText = config.deafnotifyText && config.deafnotifyText != '' ? config.deafnotifyText : 'You were moved to the AFK channel because you are deafend.'
    config.idleThreshold = config.idleThreshold || 0
    config.idlenotifyType = config.idlenotifyType || 0
    config.idlenotifyText = config.idlenotifyText && config.idlenotifyText != '' ? config.idlenotifyText : 'You were moved to the AFK channel because you are for 30 minutes.'
    config.preidlenotifyType = config.preidlenotifyType || 0
    config.preidlenotifyText = config.preidlenotifyText && config.preidlenotifyText != '' ? config.preidlenotifyText : 'You will be moved in 1 minute because you are idle.'

    config.notifyEnabled = config.notifyEnabled || false
    engine.saveConfig(config)

    var log = new Logger()
    log.debug = false
    var idleThreshold = config.idleThreshold * 60 * 1000
    var afkChannel = backend.getChannelByID(config.afkChannel)
    var afk = []
    var queue = []
    var lastMoveEvent = {}

    // check whether afk channel is set
    if (!config.afkChannel) {
        engine.notify('You need to specify an afk channel in the config.')
        log.e('You need to specify an afk channel in the config.')
        return
    }

    // check whether afk channel is valid
    if (!afkChannel) {
        log.w('Unable to find afk channel.')
    }

    event.on('connect', function() {
        var channel = backend.getChannelByID(config.afkChannel)
        if (channel) {
            afkChannel = channel
        } else {
            log.w('AFK Channel not found on connect.')
        }
    })

    event.on('load', function() {
        var channel = backend.getChannelByID(config.afkChannel)
        if (channel) {
            afkChannel = channel
        } else {
            log.w('AFK Channel not found on load.')
        }
    })

    // log info on startup
    log.i('debug messages are ' + (log.debug ? 'en' : 'dis') + 'abled')
    log.i(info.name + ' v' + info.version + ' by ' + info.author + ' loaded successfully.')

    var events = [
        {
            name: 'away',
            afk:  'clientAway',
            back: 'clientBack'
        },
        {
            name: 'mute',
            afk:  'clientMute',
            back: 'clientUnmute'
        },
        {
            name: 'deaf',
            afk:  'clientDeaf',
            back: 'clientUndeaf'
        },
    ]
    events.forEach(function (ev) {
        if (config[ev.name + 'Enabled']) {
            log.d(ev.name + ' is enabled')

            event.on(ev.afk, function (client) {
                log.d(ev.afk + ': ' + client.nick())

                if (groupIsIncluded(client, config[ev.name + 'SgBlacklist']) && channelIsIncluded(client, config[ev.name + 'ChannelIgnoreType'], config[ev.name + 'ChannelList'])) {
                    if (config[ev.name + 'Delay']) {
                        addQueue(client, ev.name)
                    } else {
                        setAFK(client, ev.name)
                    }
                } else {
                    log.d('blacklisted, ignoring')
                }
            })

            event.on(ev.back, function (client) {
                log.d(ev.back + ': ' + client.nick())

                removeAFK(client, ev.name)
            })
        }
    })

    function addQueue(client, event) {
        log.d('pushing client to queue (' + event + ')')

        queue.push({
            event: event,
            uid: client.uid(),
            timestamp: timestamp()
        })
    }

    function removeQueue(index) {
        queue.splice(index, 1)
    }

    function checkQueue() {
        queue.forEach(function (queuedAFKclient, i) {
            var event = queuedAFKclient.event
            var client = backend.getClientByUID(queuedAFKclient.uid)

            if (!client) {
                log.d('Error: client not found')

                removeQueue(i)
                return
            }

            var stillAFK = false
            switch (event) {
                case 'away': stillAFK = client.isAway(); break
                case 'mute': stillAFK = client.isMuted(); break
                case 'deaf': stillAFK = client.isDeaf(); break
            }

            if (stillAFK) {
                var timePassed = timestamp() - queuedAFKclient.timestamp
                var delay = config[event + 'Delay'] * 1000

                if (timePassed >= delay) {
                    setAFK(client, event)
                } else {
                    // don't remove from queue, continue waiting
                    return
                }
            }
            removeQueue(i)
        })
    }

    // check queue every 2s
    setInterval(checkQueue, 2 * 1000)

    if (config.idleEnabled) {
        log.d('idle move is enabled')

        setInterval(checkIdle, 10 * 1000)
        checkIdle()

        // workaround to improve idle time accuracy
        event.on('clientMove', function (ev) {
            if (ev.toChannel) {
                lastMoveEvent[ev.client.uid()] = timestamp()
            } else {
                // remove client on disconnect
                delete lastMoveEvent[ev.client.uid()]
                delete afk[ev.client.uid()]
            }
        })
    } else {
        event.on('clientMove', function (ev) {
            if (!ev.toChannel) {
                // remove client on disconnect
                delete afk[ev.client.uid()]
            }
        })
    }

    function checkIdle() {
        backend.getClients().forEach(function (client) {
            if (afkChannel.equals(client.getChannels()[0])) {
                // client is already in afk channel
                return
            }

            if (client.getIdleTime() > idleThreshold && (lastMoveEvent[client.uid()] || 0) < timestamp() - idleThreshold) {
                if (groupIsIncluded(client, config.idleSgBlacklist) && channelIsIncluded(client, config.idleChannelIgnoreType, config.idleChannelList)) {
                    setAFK(client, 'idle')
                }
            }
        })
    }

    /**
     * @param {Client} client
     * @param {string} event away/mute/deaf/idle
     */
    function removeAFK(client, event) {
        var afkClient = afk[client.uid()] ? afk[client.uid()][event] : null

        if (afkClient) {
            var moveBack = config[event + 'MoveBack']
            log.d(client.nick() + ' was away for ' + Math.round((timestamp() - afkClient.timestamp) / 1000) + 's')
            log.d('moveBack: ' + moveBack)

            afk[client.uid()][event] = null

            if (moveBack) {
                var prevChannel = backend.getChannelByID(afkClient.prevChannel)
                log.d('moving client back to prev channel (' + prevChannel.id() + '/' + prevChannel.name() + ')')

                client.moveTo(prevChannel)
            }
        } else {
            log.d('Client ' + client.nick() + ' is not saved as afk')
        }
    }

    /**
     * @param {Client} client
     * @param {string} event away/mute/deaf/idle
     */
    function setAFK(client, event) {
        if (afkChannel.equals(client.getChannels()[0])) {
            log.d(client.nick() + ' is already AFK (' + event + ') (' + afkChannel.id() + '==' + client.getChannels()[0].id())
            return
        }

        log.d(client.nick() + ' is AFK (' + event + ')')

        if (!afk[client.uid()]) {
            // initialize
            afk[client.uid()] = {}
        }

        afk[client.uid()][event] = {
            prevChannel: client.getChannels()[0].id(),
            timestamp: timestamp()
        }

        client.moveTo(afkChannel)

        if (config.notifyEnabled) {
            var msg = config.notifyText.replace(/%reason%/gi, event)
            switch (config.notifyType) {
                case "0":
                case 0: client.chat(msg); break
                case "1":
                case 1: client.poke(msg); break
            }
        }
    }

    /**
     * Checks if a client has a servergroup that is blacklisted
     *
     * @param {Client} client
     * @param {Array} blacklist blacklist config array
     * @return {boolean}
     */
    function groupIsIncluded(client, blacklist) {
        if (!blacklist)
            return true

        return !client.getServerGroups().some(function (servergroup) {
            return blacklist.some(function (blacklistItem) {
                return servergroup.id() == blacklistItem.servergroup
            })
        })
    }

    /**
     * Checks wheter the channel a client is in should be checked.
     *
     * @param {Client} client
     * @param {Number} listType
     * @param {Array} channelList
     * @return {boolean}
     */
    function channelIsIncluded(client, listType, channelList) {
        if (!listType) {
            return true
        }

        if (!channelList) {
            // returns true if blacklist
            return listType != 1
        }

        // returns true if (whitelist and included) or (not whitelist and not included)
        return (listType == 1) == client.getChannels().some(function (channel) {
            return channelList.some(function (item) {
                return channel.id() == item.channel
            })
        })
    }

    /**
     * Returns the current timestamp in ms
     *
     * @return {number} timestamp
     */
    function timestamp() {
        return Date.now()
    }

    /**
     * Creates a logging interface
     * @requires engine
     */
    function Logger() {
        this.debug = false
        this.log = function (level, msg) {
            if (typeof msg == 'object') {
                msg = JSON.stringify(msg)
            }
            engine.log('[' + level + '] ' + msg)
        }
        this.e = function (msg) {
            this.log('ERROR', msg)
        }
        this.w = function (msg) {
            this.log('WARN', msg)
        }
        this.i = function (msg) {
            this.log('INFO', msg)
        }
        this.d = function (msg) {
            if (this.debug)
                this.log('DEBUG', msg)
        }
    }
})

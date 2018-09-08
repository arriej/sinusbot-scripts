/**
 * Forum:  https://forum.sinusbot.com/resources/away-mover.179/
 * GitHub: https://github.com/irgendwr/sinusbot-scripts
 */

registerPlugin({
    name: 'AFK mover (Away/Mute/Deaf/Idle)',
    version: '2.2.1',
    description: 'Moves clients that are set as away, have their speakers/mic muted or are idle to a specified channel',
    author: 'irgendwer / Jonas <dev@sandstorm-projects.de>',
    vars: [
        /*** general ***/
        {
            name: 'afkChannel',
            title: 'AFK Channel',
            type: 'channel'
        },

        /*** away ***/
        {
            name: 'awayEnabled',
            title: '[AWAY] Move users who set themselves as away',
            type: 'checkbox'
        },
        {
            name: 'awayMoveBack',
            title: 'Move users back',
            type: 'checkbox',
            indent: 3,
            conditions: [{ field: 'awayEnabled', value: true }]
        },
        {
            name: 'awaySgBlacklist',
            title: 'Ignore users with these servergroups:',
            type: 'array',
            vars: [{
                name: 'servergroup',
                title: 'Servergroup',
                type: 'number'
            }],
            indent: 3,
            conditions: [{ field: 'awayEnabled', value: true }]
        },
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
            conditions: [{ field: 'awayEnabled', value: true }, { field: 'awayChannelIgnoreType', value: true }]
        },
        {
            name: 'awayDelay',
            title: 'Delay (in seconds)',
            type: 'number',
            indent: 3,
            conditions: [{ field: 'awayEnabled', value: true }]
        },

        /*** mute ***/
        {
            name: 'muteEnabled',
            title: '[MUTE] Move users who mute themselves',
            type: 'checkbox'
        },
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
            conditions: [{ field: 'muteEnabled', value: true }, { field: 'muteChannelIgnoreType', value: true }]
        },
        {
            name: 'muteDelay',
            title: 'Delay (in seconds)',
            type: 'number',
            indent: 3,
            conditions: [{ field: 'muteEnabled', value: true }]
        },

        /*** deaf ***/
        {
            name: 'deafEnabled',
            title: '[DEAF] Move users who deactivate their speaker',
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
            conditions: [{ field: 'deafEnabled', value: true }, { field: 'deafChannelIgnoreType', value: true }]
        },
        {
            name: 'deafDelay',
            title: 'Delay (in seconds)',
            type: 'number',
            indent: 3,
            conditions: [{ field: 'deafEnabled', value: true }]
        },

        /*** idle ***/
        {
            name: 'idleEnabled',
            title: '[IDLE] Move users who are idle for too long (use with care!)',
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
            conditions: [{ field: 'idleEnabled', value: true }, { field: 'idleChannelIgnoreType', value: true }]
        },
        {
            name: 'idleThreshold',
            title: 'How long are people allowed to be idle? (in minutes, don\'t use small values!)',
            type: 'number',
            indent: 3,
            conditions: [{ field: 'idleEnabled', value: true }]
        },

        /*** general - notify ***/
        {
            name: 'notifyEnabled',
            title: 'Notify users when they get moved',
            type: 'checkbox'
        },
        {
            name: 'notifyType',
            title: 'How should users be notified?',
            type: 'select',
            options: [ 'chat', 'poke' ],
            indent: 3,
            conditions: [{ field: 'notifyEnabled', value: true }]
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
    config.muteMoveBack = config.muteMoveBack || false
    config.muteDelay = config.muteDelay || 0
    config.deafMoveBack = config.deafMoveBack || false
    config.deafDelay = config.deafDelay || 0
    config.idleThreshold = config.idleThreshold || 0
    config.notifyEnabled = config.notifyEnabled || false
    config.notifyType = config.notifyType || 0
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

    /*** away ***/

    if (config.awayEnabled) {
        log.d('away move is enabled')

        event.on('clientAway', function (client) {
            log.d('clientAway: ' + client.nick())

            if (groupIsIncluded(client, config.awaySgBlacklist) && channelIsIncluded(client, config.awayChannelIgnoreType, config.awayChannelList)) {
                if (getAFK(client)) {
                    log.d('ignoring event since ' + client.nick() + ' is already afk')
                    return
                }

                if (config.awayDelay) {
                    log.d('delay enabled (' + config.awayDelay + '), pushing client to queue...')

                    queue.push({
                        event: 'away',
                        uid: client.uid(),
                        timestamp: timestamp()
                    })
                } else {
                    setAFK(client, 'away')
                }
            } else {
                log.d('blacklisted, ignoring')
            }

        })

        event.on('clientBack', function (client) {
            log.d('clientBack: ' + client.nick())

            var afkClient = getAFK(client)
            if (afkClient && afkClient.event == 'away') {
                removeAFK(client, config.awayMoveBack)
            }
        })
    }

    /*** mute ***/

    if (config.muteEnabled) {
        log.d('mute move is enabled')

        event.on('clientMute', function (client) {
            log.d('clientMute: ' + client.nick())

            if (groupIsIncluded(client, config.muteSgBlacklist) && channelIsIncluded(client, config.muteChannelIgnoreType, config.muteChannelList)) {
                if (getAFK(client)) {
                    log.d('ignoring event since ' + client.nick() + ' is already afk')
                    return
                }

                if (config.muteDelay) {
                    log.d('delay enabled (' + config.muteDelay + '), pushing client to queue...')

                    queue.push({
                        event: 'mute',
                        uid: client.uid(),
                        timestamp: timestamp()
                    })
                } else {
                    setAFK(client, 'mute')
                }
            } else {
                log.d('blacklisted, ignoring')
            }
        })

        event.on('clientUnmute', function (client) {
            log.d('clientUnmute: ' + client.nick())

            var afkClient = getAFK(client)
            if (afkClient && afkClient.event == 'mute') {
                removeAFK(client, config.muteMoveBack)
            }
        })
    }

    /*** deaf ***/

    if (config.deafEnabled) {
        log.d('deaf move is enabled')

        event.on('clientDeaf', function (client) {
            log.d('clientDeaf: ' + client.nick())

            if (groupIsIncluded(client, config.deafSgBlacklist) && channelIsIncluded(client, config.deafChannelIgnoreType, config.deafChannelList)) {
                if (getAFK(client)) {
                    log.d('ignoring event since ' + client.nick() + ' is already afk')
                    return
                }

                if (config.deafDelay) {
                    log.d('delay enabled (' + config.deafDelay + '), pushing client to queue...')

                    queue.push({
                        event: 'deaf',
                        uid: client.uid(),
                        timestamp: timestamp()
                    })
                } else {
                    setAFK(client, 'deaf')
                }
            } else {
                log.d('blacklisted, ignoring')
            }
        })

        event.on('clientUndeaf', function (client) {
            log.d('clientUndeaf: ' + client.nick())

            var afkClient = getAFK(client)
            if (afkClient && afkClient.event == 'deaf') {
                removeAFK(client, config.deafMoveBack)
            }
        })
    }

    function removeFromQueue(index) {
        queue.splice(index, 1)
    }

    function checkQueue() {
        queue.forEach(function (queuedAFKclient, i) {
            var event = queuedAFKclient.event
            var client = backend.getClientByUID(queuedAFKclient.uid)

            if (!client) {
                log.d('Error: client not found')

                removeFromQueue(i)
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
            removeFromQueue(i)
        })
    }

    // check queue every 2s
    setInterval(checkQueue, 2 * 1000)

    if (config.idleEnabled) {
        log.d('idle move is enabled')

        // check for idle clients every minute
        setInterval(checkIdle, 1 * 60 * 1000)

        // workaround to improve idle time accuracy
        event.on('clientMove', function (ev) {
            lastMoveEvent[ev.client.uid()] = timestamp()
        })
    }

    function checkIdle() {
        backend.getClients().forEach(function (client) {
            if (afkChannel.equals(client.getChannels()[0])) {
                // client is already in afk channel
                return
            }

            if (client.getIdleTime() > idleThreshold && lastMoveEvent[client.uid()] < timestamp() - idleThreshold) {
                if (groupIsIncluded(client, config.idleSgBlacklist) && channelIsIncluded(client, config.idleChannelIgnoreType, config.idleChannelList)) {
                    setAFK(client, 'idle')
                }
            }
        })
    }

    /**
     * Gets client from AFK array
     * 
     * @param {Client} client
     * @return {Object?} AFKclientEntry or null if not found
     */
    function getAFK(client) {
        var afkClient = null

        afk.some(function (item) {
            if (item.uid == client.uid()) {
                afkClient = item
                return true
            }
            return false
        })

        return afkClient
    }

    /**
     * Removes client from AFK array
     * 
     * @param {Client} client
     * @param {boolean} moveBack Whether the client should be moved back or not
     */
    function removeAFK(client, moveBack) {
        var afkClient = getAFK(client)

        if (afkClient) {
            log.d(client.nick() + 'was away for ' + Math.round((timestamp() - afkClient.timestamp) / 1000) + 's')
            log.d('moveBack: ' + moveBack)

            if (moveBack) {
                var prevChannel = backend.getChannelByID(afkClient.prevChannel)
                log.d('moving client back to prev channel (' + prevChannel.id() + '/' + prevChannel.name() + ')')

                client.moveTo(prevChannel)
            }
        } else {
            log.d('Client ' + client.nick() + ' not in array')
        }
    }

    /**
     * Moves a client to the afk channel and adds him to the afk array.
     * 
     * @param {Client} client
     * @param {string} event away/mute/deaf/idle
     */
    function setAFK(client, event) {
        log.d(client.nick() + ' is AFK (' + event + ')')

        client.moveTo(afkChannel)
        afk.push({
            event: event,
            uid: client.uid(),
            prevChannel: client.getChannels()[0].id(),
            timestamp: timestamp()
        })

        if (config.notifyEnabled) {
            var msg = 'You were moved to the afk channel, reason: ' + event
            switch (config.notifyType) {
                case 0: client.chat(msg); break
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
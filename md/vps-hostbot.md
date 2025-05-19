# Table of Contents
### Before we start, I kindly ask to disable adblockers. I promise that the ads are non-invasive

## Please make sure to go through the guide thoroughly as it does include everything you may need.

## This guide is a newer version of made with @IceSandSlash's version of aura-bot. It boasts better optimization and ping
## It also uses Ubuntu 24.04. Since 18.04 is not being supported anymore, its nice to upgrade.

### If you would like to still use the old version, please [go here](https://sfarmani.github.io/vps-hostbot-legacy.html)

1. [Introduction](#introduction)
2. [Tools and links](#tools-and-links)
3. [Choosing a VPS](#choosing-a-vps)
4. [VPS setup](#vps-setup)
5. [Host-bot Setup](#host-bot-setup)
6. [Maintenance](#maintenance)

# Introduction
### Setting up a `Warcraft III 1.28.5 hostbot` can be stressful and if you don't have any coding experience it can dissuade you from trying. My hope is that anyone can make a hostbot with this tutorial.

### Unfortunately, a hostbot on a server is not a free service (unless you use AWS Ec2 or Google Compute Engine - I will cover those in the [Choosing a VPS](#choosing-a-vps) section).

> If you would like to setup a bot on your local PC, there are lots of guides to follow online. Searching something along the lines of `wc3 ghost++ tutorial` or `wc3 ghostone tutorial` will probably yield results. Keep in mind that you will have to port-forward at some point so if your modem doesn't allow that, then you may not be able to host at all.
> 
> Also note that if you decide to go with ghost++, then you should use [this repository](https://github.com/Shiox/ghostpp).

[↑ Back to table of contents ↑](#table-of-contents)

# Tools and links
1. [PuTTY](https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe) - To access your VPS terminal through SSH
2. [PuTTYgen](https://the.earth.li/~sgtatham/putty/latest/w64/puttygen.exe) - To generate a private and public key
3. [WinSCP](https://winscp.net/eng/download.php) - For transfering files easier (as well as editing files easier)
4. [aura-bot files](https://gitlab.com/ivojulca/aura-bot)
5. [Warcraft III 1.28.5 files](https://drive.google.com/file/d/1M9_IOUpMwFdQl9eeQwsvdvVqp8uxgU-I/view?usp=sharing) - Put together with only the essential files

[↑ Back to table of contents ↑](#table-of-contents)

# Choosing a VPS
## If you are not interested in choosing your own Virtual Private Server (VPS) and want to go with [Linode](https://www.linode.com), you can skip this section and jump to [VPS setup](#vps-setup).

<details>
    <summary data-open="Hide" data-close="View VPS selection"></summary>
Choosing a Virtual Private Server (VPS) is very important and it depends on a couple of factors.

I personally chose Linode as it worked for me, however it may not work for everyone as it has limited locations available.

For the purposes of this tutorial, I will be using [Linode](https://www.linode.com) as the recommended VPS to rent.

I will also provide some simple factors to choosing your own VPS, as well as talking about some [pros and cons of free trial VPS's](#aws-ec2-and-google-compute-engine).

Things to consider when choosing a VPS
1. [Locations available](#locations-available)
2. [OS available](#os-available)
3. [Pricing](#pricing)
4. [VPS Specs](#vps-specs)

[↑ Back to table of contents ↑](#table-of-contents)

## Locations available
Before you choose any VPS, first make sure that the VPS has the locations you are looking for. To research, a simple google search is all that is required.

Using Linode as an example, searching up "Linode data center locations". You can then replace Linode with any other VPS you had in mind.

One of the reasons Linode is my recommended is because it has a diverse set of locations.

## OS available
Most VPS would have the Operating System we will use in this tutorial, but its not a bad thing to just make sure.

The OS we will use in this tutorial is Ubuntu 24.04

## Pricing
A Virtual Private Server is a server that has the bare minimum so it shouldn't cost a lot. Linode's lowest VPS costs only `5 USD per month`.

As a recommendation, you shouldn't be paying anything over `10 USD per month`. `5 USD` is also a good minimum because anything lower could lead to not enough resources for the hostbot to run.

## VPS Specs
A Warcraft III hostbot requires a small amount of resources to run.

1. 1 CPU - more CPUs increase performance
2. At least 2 GB of RAM
3. At least 3 GB of storage
4. 200 mb/s transfer rate or higher (bandwith)

If you want a better performance bot, then you should focus on maximizing `#1` and `#4` and just get the minimum of `#2` and `#3`. For some VPS, that my cause you to pay extra, or above `10 USD`, so choose wisely.

## AWS EC2 and Google Compute Engine
Amazon and Google offer some VPS services as well, some of which provide up to 1 year's worth of free trial.

Although that sounds great, I believe there are some downsides to using them.


|                                                                PROs                                                               |                                                       CONs                                                       |
|:---------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------:|
| + Since it's a free trial for 1 year, it's great practice and doesn't cost anything (as long as you are within their condditions) | - Hard to use interface, not very intuitive                                                                      |
| + Has lots of locations to choose from                                                                                            | - Has extra steps to configuring (portforwarding - firewall setup)                                              |
|                                                                                                                                   | - Has restrictions and conditions in order to get the free trial, which means upgrading is going to cost you     |
|                                                                                                                                   | - For the Google Compute Engine, some [countries are banned](https://support.google.com/cloudidentity/answer/2891389?hl=en#:~:text=However%2C%20Google%20restricts%20access%20to,%2C%20North%20Korea%2C%20and%20Syria.) from using it, so players from those regions can't connect to your bot. |

> To portforward, make sure to allow all IP addresses and all ports (or just ports 6112-6126) for both UDP and TCP

[↑ Back to table of contents ↑](#table-of-contents)
</details>

# VPS Setup
Once you've chosen your VPS, then we can begin setting it up. I will use Linode as examples.

1. Navigate to your VPS's site (for [Linode](https://www.Linode.com)) and sign up with an account.
    > It will immediately require you to enter a Credit Card/PayPal information.
    > 
    > It won't charge you until you make an instance of a server and use it for about a month.
    > This should be true for all other VPS's

2. Click on <kbd>Create</kbd> and select `Linode`

    <img src="img/create-linode.png" alt="Create Linode" style="max-width: 50%">

3. Select a location. (I chose Newark - there's lots to choose from)

    <img src="img/select-region.png" alt="Select Region" style="max-width: 50%">

4. Select `Ubuntu` and from the dropdown select `24.04 (LTS)`
5. Select `Shared CPU`
6. Choose the first plan `Nanode 1 GB` for `$5/month`

    <img src="img/plan-options.png" alt="Plan Options" style="max-width: 50%">

7. Skip `Details` and `Security` section (you can choose to do a password, its just harder. As long as you don't share the private keys to anyone, you should be secure.)

8. In `SSH Keys` section, this is where we need to generate a private and public key with the `PuTTYgen` tool linked in the [Tools and links](#tools-and-links) section.
    - Open `PuTTYgen.exe` and press <kbd>Generate</kbd>.
    - Randomly move your mouse to generate a key.
    - Press <kbd>Save private key</kbd> and name it anything. Save it in a location you will remember and not delete. You can add a password, but its not required.
    > If anyone ever asks for your private key, do not give it to them unless you trust the person.
    - Copy the generated text at the top.
    - Go back to Linode site and press New SSH Key.
    - Paste in the text you just copied and name it anything you want.
    - You can now close `PuTTYgen.exe`

9. `VPC`, `Firewall`, `VLAN`, `Add-ons` are all empty.
10. Once you have all that, you can press <kbd>Create Linode</kbd>.
11. Wait for your server to finish starting up and find its `IP address` and copy it.
12. Open up `PuTTY.exe` to setup access to the server.
    - `Connection > SSH > Auth`
        - Private key file for authentication: Browse for the `private key` you saved earlier.
        
        <img src="img/putty-privatekey.png" alt="Browse private key in putty" style="max-width: 50%">

    - `Session`
        - Host Name: `root@ip.address.here`
        - Saved Sessions: Type a random name to save under.
        - Click <kbd>Save</kbd>
13. To open a session to your server, `double click` the name you saved under.
    > The first time you run the server, it will give you 2 prompts. Just press <kbd>Yes</kbd> and <kbd>ok</kbd>
    > 
    > If you put a password in the `PuTTYgen.exe` step, then enter the password
14. Open `WinSCP` ([Tools and links](#tools-and-links))
    > If you didn't install `WinSCP` until this point, it will ask if you want to import any sites. Select the name you saved it as in `PuTTY`.
    > 
    > If you already installed it, then you can press `Tools > Import Sites...` and select the name you saved in `PuTTY`

    - With the site highlighted, press <kbd>Login</kbd> to open a session of your server.

    - Now press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>H</kbd> to show hidden files (we will need this for later)

Now that you have access to your server, we can begin setting up your hostbot

[↑ Back to table of contents ↑](#table-of-contents)

# Host-bot Setup
Before we actually start, we need to do a little bit of server updating

In your `PuTTY` session, paste in the following command, one line at a time.

- On `PuTTY`, you have to right click to paste.

```bash
sudo apt-get update && apt-get install -y build-essential git libssl-dev libgmp3-dev libbz2-dev zlib1g-dev libcurl4-openssl-dev curl cmake
```

> If at any point it takes you to a pink screen, just press enter and it will pick the default.

## Start set-up

### Set-up `PuTTY` files
1. In `PuTTY` paste in this line: `git clone https://gitlab.com/ivojulca/aura-bot.git`
2. Paste these: 
```bash
touch restart_aura.sh
chmod u+x restart_aura.sh
```
For now we are done with `PuTTY`.

### Edit files with `WinSCP`
1. Open `WinSCP` and `Login`
    > If you followed the step in the end of setting up `WinSCP`, you should be able to see files that start with a dot. If you don't, just press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>H</kbd>
2. Find the file named `.bashrc` and double click it. An editor should pop up and now you can edit files.
    > First time opening a file might prompt you to choose an editor. For easy access, you can just select internal editor.
3. Scroll down to the area where it says `some more ls aliases` and paste in the following after it.

```bash
alias startbot="cd /root/aura-bot/ ; nohup aura --exec \"load twrpg\" --exec-as \"ign@server.eurobattle.net\" > /root/aura-bot/logs/aura_out.log 2>&1 &"
alias ea="vi ~/.bashrc"
alias sa="source ~/.bashrc"
alias fa="ps -ef | grep aura | grep -v grep"
alias botlog="tail -f -n 100 /root/aura-bot/logs/aura_out.log"
export AURA_HOME="/root/aura-bot/"
export AURABUILD_CPR=0
export AURABUILD_DPP=0
```

> replace where it says ign with your in game name (not the bot's name, the bot OWNER name)
> Save the editor and close it (<kbd>CTRL</kbd> + <kbd>S</kbd>).

4. Find the file named `restart_aura.sh` and double click it.
5. Paste the following:

```bash
#!/bin/bash
if ! pgrep -x "aura" > /dev/null
then
     cp /root/aura-bot/logs/aura_out.log /root/aura-bot/logs/OLDaura_out.log
     cd /root/aura-bot ; nohup aura --exec "load twrpg" --exec-as "ign@server.eurobattle.net" > /root/aura-bot/logs/aura_out.log 2>&1 &
fi
```

> replace where it says ign with your in game name
> Save the editor and close it (<kbd>CTRL</kbd> + <kbd>S</kbd>).

6. Navigate to `aura-bot/` and create new folders:
    - `maps` -> will store maps
    - `logs` -> log files will go there

7. Download the zip file for Warcraft III files to your desktop from the [Tools and links](#tools-and-links) section.
    - Transfer the zip file to your server by dragging the file to the right hand side of the `WinSCP` window.
    > We will unzip it later.

8. Find `config-example.ini` file and copy and paste it. Rename the copied to `config.ini`. Double click `config.ini` to edit.

9. Go through the config file, search for each key below and edit the value to be the same as below.
> read the comments to ensure you understand the setting and select the correct choices for your own needs.

```ini
game.install_path = wc3
game.install_version = 1.28
hosting.game_versions.main = 1.28
hosting.game_ready.mode = explicit
hosting.latency.default = 10
bot.maps_path = maps
bot.log_path = logs/aura.log
net.host_port.only = 6115
net.lag_screen.enabled = no
net.stop_lag.sync_limit.default = 10
hosting.map_downloads.enabled = no
net.has_buffer_bloat = no
hosting.high_ping.warn_ms = 130
hosting.high_ping.safe_ms = 90
hosting.ip_filter.flood_handler = none
hosting.name_filter.unsafe_handler = none
hosting.expiry.lobby.timeout = 300
hosting.expiry.owner.timeout = 200
ui.notify_joins.enabled = no
hosting.game_over.player_count = 0
global_realm.game_version = 1.28
global_realm.flood.wrap = 255
global_realm.flood.max_size = 255
global_realm.locale_short = enUS

realm_1.enabled = no
realm_5.enabled = no
realm_9.enabled = no
realm_10.enabled = no
realm_14.enabled = no
realm_17.enabled = no
realm_21.enabled = no

realm_13.username = botnamehere
realm_13.password = botpasswordhere

net.game_discovery.udp.broadcast.enabled = no
```

> these settings should be uncommented so they work:

```ini
realm_13.exe_auth.version_details = 0 5 28 1
realm_13.exe_auth.version_hash = 201 63 116 96
realm_13.exe_auth.info = war3.exe 08/12/16 18:47:21 471040
```

> edit these as you wish - just know it needs to be filled out:

```ini
hosting.self.virtual_player.name = botname         -> you can use color codes (|cFF008000Lee), but that takes up character spaces
hosting.game_start.count_down_interval = 0
hosting.game_start.count_down_ticks = 0
hosting.log_chat = always
hosting.log_remote.mode = none
```

> These are configs that aren't in the config-example.ini file already. Add them to the bottom of the config.ini file:

```ini
bot.load_maps.cache.enabled = yes
hosting.early_end.enabled = no
```

10. Find the key `net.tcp_extensions.gproxy.reconnect_wait` and replace it with `net.tcp_extensions.gproxy_legacy.reconnect_wait` (change value from 5 to 10)

> If you have not already done so, create an account on Eurobattle.net for your bot. If you have any capital letters in your password, make them all lower-case when entering it in the `config.ini` file.
> 
> Everything else should be self-explanatory. If it is not, please refer to the comments on the `.ini` file.
> 
> Save the editor and close it (<kbd>CTRL</kbd> + <kbd>S</kbd>).


11. Navigate to `mapcfgs/`
> Create a new file called twre.ini and paste in this:

```ini
map.local_path = twrpgv0.70d_eng.w3x
map.path = Maps\Download\twrpgv0.70d_eng.w3x
map.title = The World RPG v0.70d
map.cfg.schema_number = 4
map.num_players = 12
map.num_teams = 2
map.slot_1 = 0 255 0 0 0 0 1 1 100 1
map.slot_10 = 0 255 0 0 0 9 1 1 100 1
map.slot_11 = 0 255 2 1 0 10 1 1 100 2
map.slot_12 = 0 255 2 1 1 11 1 1 100 2
map.slot_2 = 0 255 0 0 0 1 1 1 100 1
map.slot_3 = 0 255 0 0 0 2 1 1 100 1
map.slot_4 = 0 255 0 0 0 3 1 1 100 1
map.slot_5 = 0 255 0 0 0 4 1 1 100 1
map.slot_6 = 0 255 0 0 0 5 1 1 100 1
map.slot_7 = 0 255 0 0 0 6 1 1 100 1
map.slot_8 = 0 255 0 0 0 7 1 1 100 1
map.slot_9 = 0 255 0 0 0 8 1 1 100 1
map.options = 96
map.num_disabled = 0
```

12. In `WinSCP`, go back to `aura-bot` base directory and find `aliases.ini`
    - remove everything and replace it with `twrpg = twre.ini`

> Each time you upload a new version of the map, you need to edit these files to update the version number.
> 
> Then in game whisper the bot the !load command to load the config file. This will be explained again later in the [Maintenance](#maintenance) section

### Compile the host-bot
We are done with `WinSCP` and can go back to `PuTTY`

1. In `PuTTY` type in the following
> For applying the aliases and unzipping the Warcraft III files.
```bash
source ~/.bashrc
cd aura-bot
unzip wc3.zip
rm -rf wc3.zip
```

> Compile the bot
> You can use the offical instructions from [here](https://gitlab.com/ivojulca/aura-bot/-/blob/master/BUILDING.md?ref_type=heads) as well

```bash
cd /root/aura-bot/deps/StormLib
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=1 ..
make
sudo make install
```

```bash
cd /root/aura-bot/deps/bncsutil/src/bncsutil
make
sudo make install
```

```bash
cd /root/aura-bot/deps/miniupnpc
make
sudo make install
```

```bash
cd /root/aura-bot
make
sudo make install
```

### Set-up `crontab`
1. In `PuTTY` type `crontab -e`
2. It will ask you to select an editor. Enter `2`
3. Press the letter `i`. You should see the bottom left change to say `- INSERT -`. This will allow you to start typing.
4. Use the arrow keys to move your cursor down to the very bottom, then to the very right. Now press `Enter` to create a new line.
5. Paste in this line: `*/1 * * * * ~/restart_aura.sh > /dev/null`
6. Press <kbd>ESC</kbd>. The `- INSERT -` text at the bottom left should now be gone.
7. Type in `:wq` and press <kbd>Enter</kbd>. This time you have to type it instead of pasting. This will save and close the file.
8. Within the next minute, your hostbot will start
> You can close `PuTTY` and `WinSCP` at this point and log into your Warcraft III (your own account) and test your bot

[↑ Back to table of contents ↑](#table-of-contents)

# Maintenance
Here are some tips to maintaining your hostbot

[List of Bot Commands](https://gitlab.com/ivojulca/aura-bot/-/blob/master/COMMANDS.md?ref_type=heads)

## Map uploading
1. Open `WinSCP` and navigate to `aura-bot/maps/`
2. From the left hand side of the window, find the map you want to upload and drag it over to the right hand side.
3. Nagivate to `aura-bot/mapcfgs/` and edit the respective config file to update the version number.
4. Log into Warcraft III and reload the map config file by typing: `/w botname !load twrpg`

## Host-bot restarting
In order to restart the bot, it is recommended to login into Warcraft III and whisper the command: `/w botname !su exit`
    - then in `PuTTy` type `botlog` to view the logs and find the command it tells you with !sudo

If your bot happends to be stuck/not responding, you can restart your bot through the server.
1. Open `PuTTY`, type in `fa` - its an alias for finding the aura-bot's process ID. ([alias commands](#alias-commands))
2. The very first number from the left is the process ID.
3. Type `Kill processID`

Within the next minute, it will start the bot again automatically.

## Editing Config files

### config.ini
The comments in your config.ini file should help clarify what you need to do for a certain field.

After you edit the file, make sure to restart your bot. (see [here](#host-bot-restarting)) 

### mapcfgs
You should only be editing files in this folder once you upload a new map. Then you would go into their respective `.ini` file and update the version number.

After that, make sure you load the map config again by:
1. logging into Warcraft III
2. Whispering your bot: `/w botname !load twrpg` (replace `twrpg` for whatever your config file is named)

## Alias commands
Here is an explanation of the alias commands

|   Command  |                                                                                                    Explanation                                                                                                    |
|:----------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| `startbot` | Pretty self explanatory, it starts the bot manually. Be careful to not use it when there is already another instance running. You will usually not have to use this as the crontab task will do it automatically. |
|    `fa`    |                                       Stands for "Find Aura". It spits out an ID of the process. You can use that ID to kill the process. (see [here](#host-bot-restarting))                                      |
|  `botlog`  |                                    Opens the bot's logs and follows it as things get written to it. It is useful to see if any errors occur. To exit the logs, press `CTRL + C`                                   |
|    `ea`    |                                     Edits the aliases. If you are more familiar with Ubuntu/Linux/etc. you can edit the aliases to add more. Make sure to run `sa` right after                                    |
|    `sa`    |                                                                                   Loads in the aliases once they are edited/etc.                                                                                  |

[↑ Back to table of contents ↑](#table-of-contents)
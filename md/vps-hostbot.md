# Table of Contents
1. [Introduction](#introduction)
2. [Tools and links](#tools-and-links)
3. [Choosing a VPS](#choosing-a-vps)
4. [VPS setup](#vps-setup)
5. [Host-bot Setup](#host-bot-setup)
6. [Maintenance](#maintenance)

# Introduction
Setting up a `Warcraft III 1.28.5 hostbot` can be stressful and if you don't have any coding experience it can dissuade you from trying. My hope is that anyone can make a hostbot with this tutorial.

Unfortunately, a hostbot on a server is not a free service (unless you use AWS Ec2 or Google Compute Engine - I will cover those in the [Choosing a VPS](#choosing-a-vps) section).

If you would like to setup a bot on your local PC, then you can follow [this guide]() instead.

# Tools and links
1. [PuTTY](https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe) - To access your VPS terminal through SSH
2. [PuTTYgen](https://the.earth.li/~sgtatham/putty/latest/w64/puttygen.exe) - To generate a private and public key
3. [WinSCP](https://winscp.net/eng/download.php) - For transfering files easier (as well as editing files easier)
4. [aura-bot files - forked by me](https://github.com/sfarmani/aura-bot)
5. [Warcraft III 1.28.5 files](https://drive.google.com/file/d/1M9_IOUpMwFdQl9eeQwsvdvVqp8uxgU-I/view?usp=sharing) - Put together with only the essential files

# Choosing a VPS
If you are not interested in choosing your own VPS and want to go with [Digital Ocean](https://www.digitalocean.com), then you can just skip this section and go to [VPS setup](#vps-setup).

Choosing a Virtual Private Server (VPS) is very important and it depends on a couple of factors.

I personally chose SkySilk as it worked for me, however it may not work for everyone as it has limited locations available.

For the purposes of this tutorial, I will be using [Digital Ocean](https://www.digitalocean.com) as the recommended VPS to rent.

I will also provide some simple factors to choosing your own VPS, as well as talking about some [pros and cons of free trial VPS's](#aws-ec2-and-google-compute-engine).

Things to consider when choosing a VPS
1. [Locations available](#locations-available)
2. [OS available](#os-available)
3. [Pricing](#pricing)
4. [VPS Specs](#vps-specs)

## Locations available
Before you choose any VPS, first make sure that the VPS has the locations you are looking for. To research, a simple google search is all that is required.

Using Digital Ocean as an example, searching up "Digital Ocean data center locations" will bring you to this [page](https://docs.digitalocean.com/products/platform/availability-matrix/). You can then replace Digital Ocean with any other VPS you had in mind.

One of the reasons Digital Ocean is my recommended is because it has a diverse set of locations.

## OS available
Most VPS would have the Operating System we will use in this tutorial, but its not a bad thing to just make sure.

The OS we will use in this tutorial is Ubuntu 18.04

## Pricing
A Virtual Private Server is a server that has the bare minimum so it shouldn't cost a lot. Digital Ocean's lowest VPS costs only `5 USD per month`.

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

### Pro's
\+ Since its a free trial for 1 year, its great practice and doesn't cost anything (as long as you are within their conditions)

\+ Has lots of locations to choose from

### Con's
\- Hard to use interface, not very intuitive.

\- Has extra steps to configuring the hostbot (port forwarding - firewall setup)

\- Has restrictions and conditions in order to get the free trial.

\- For the Google Compute Engine, some [countries are banned](https://support.google.com/cloudidentity/answer/2891389?hl=en#:~:text=However%2C%20Google%20restricts%20access%20to,%2C%20North%20Korea%2C%20and%20Syria.) from using it, so players from those regions can't connect to your bot.

# VPS Setup
Once you've chosen your VPS, then we can begin setting it up. I will use Digital Ocean as examples.

1. Navigate to your VPS's site (for [Digital Ocean](https://www.digitalocean.com)) and sign up with an account.
    > It will immediately require you to enter a your Credit Card/PayPal information.
    > 
    > It won't charge you until you make an instance of a server and use it for about a month.
    > This should be true for all other VPS's
2. Once you are done setting up a credit card, it will probably ask you to jump in.
    - We don't want to do that, so we will skip it by click on the link that says `Explore our control panel`.

    <img src="img/skip-quickstart.png" alt="Skip to control panel" style="max-width: 50%">

3. Click on `Create` and select `Droplets`

    <img src="img/create-droplets.png" alt="Create Droplets" style="max-width: 50%">

4. Select `Ubuntu` and from the dropdown select `18.04 (LTS) x64`
5. Select `Basic plan` under `Shared CPU`
6. Make sure to tick `Regular Intel with SSD` for the CPU options
7. Select the most left option that says `$5/month`

    <img src="img/plan-options.png" alt="Plan Options" style="max-width: 50%">

8. Select the location you want. The number doesn't matter.
9. Select SSH keys. This is where we need to generate a private and public key with the `PuTTYgen` tool linked in the [Tools and links](#tools-and-links) section.
    - Open `PuTTYgen.exe` and press `Generate`.
    - Randomly move your mouse to generate a key.
    - Press `Save private key` and name it anything. Save it in a location you will remember and not delete. You can add a password, but its not required.
    > If anyone ever asks for your private key, do not give it to them unless you trust the person.
    - Copy the generated text at the top.
    - Go back to Digital Ocean site and press New SSH Key.
    - Paste in the text you just copied and name it anything you want.
    - You can now close `PuTTYgen.exe`

10. Once you have all that, you can press `Create Droplet`.
11. Wait for your server to finish starting up and find its `IP address` and copy it.
12. Open up `PuTTY.exe` to setup access to the server.
    - `Connection > SSH > Auth`
        - Private key file for authentication: Browse for the `private key` you saved earlier.
        
        <img src="img/putty-privatekey.png" alt="Browse private key in putty" style="max-width: 50%">

    - `Session`
        - Host Name: `root@ip.address.here`
        - Saved Sessions: Type a random name to save under.
        - Click `Save`
13. To open a session to your server, `double click` the name you saved under.
    > The first time you run the server, it will give you 2 prompts. Just press `yes` and `ok`
    > 
    > If you put a password in the `PuTTYgen.exe` step, then enter the password
14. Open `WinSCP` ([Tools and links](#tools-and-links))
    > If you didn't install `WinSCP` until this point, it will ask if you want to import any sites. Select the name you saved it as in `PuTTY`.
    > 
    > If you already installed it, then you can press `Tools > Import Sites...` and select the name you saved in `PuTTY`

    - With the site highlighted, press `Login` to open a session of your server.

    - Now press `CTRL + ALT + H` to show hidden files (we will need this for later)

Now that you have access to your server, we can begin setting up your hostbot

# Host-bot Setup
Before we actually start, we need to do a little bit of server updating

In your `PuTTY` session, paste in the following command, one line at a time.

- On `PuTTY`, you have to right click to paste.

```bash
sudo apt-get update -y
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
sudo apt-get install unzip git build-essential m4 libgmp3-dev cmake libbz2-dev zlib1g-dev -y
```

> If at any point it takes you to a pink screen, just press enter and it will pick the default.

## Start set-up

### Set-up `PuTTY` files
1. In `PuTTY` paste in this line: `git clone https://github.com/sfarmani/aura-bot.git`
2. Paste these: 
```bash
touch restart_aura.sh
chmod u+x restart_aura.sh
```
For now we are done with `PuTTY`.

### Edit files with `WinSCP`
1. Open `WinSCP` and `Login`
    > If you followed the step in the end of setting up `WinSCP`, you should be able to see files that start with a dot. If you don't, just press `CTRL + ALT + H`
2. Find the file named `.bashrc` and double click it. An editor should pop up and now you can edit files.
    > First time opening a file might prompt you to choose an editor. For easy access, you can just select internal editor.
3. Scroll down to the area where it says `some more ls aliases` and paste in the following after it.
```bash
alias startbot="cd ~/aura-bot/ ; nohup aura++ > aura.log 2>&1 &"
alias ea="vi ~/.bashrc"
alias sa="source ~/.bashrc"
alias fa="ps -ef | grep aura++ | grep -v grep"
alias botlog="tail -f -n 100 ~/aura-bot/aura.log"
```
> Save the editor and close it (`CTRL + S`).

4. Find the file named `restart_aura.sh` and double click it.
5. Paste the following:
```bash
#!/bin/bash
ps -ef | grep aura++ | grep -v grep
if [ $? != 0 ]
then
        cp ~/aura-bot/aura.log ~/aura-bot/OLDaura.log
        cd ~/aura-bot/ && nohup aura++ > aura.log 2>&1 &
fi
```
> Save the editor and close it (`CTRL + S`).

6. Navigate to `aura-bot/` and create a new `folder`. Name it `maps`. This is the folder you will upload your maps into.

7. Download the zip file for Warcraft III files to your desktop from the [Tools and links](#tools-and-links) section.
    - Transfer the zip file to your server by dragging the file to the right hand side of the `WinSCP` window.
    > We will unzip it later.

8. Double click `aura.cfg` to edit.

9. Most parts are already edited and should stay the same. The only parts you should be editing are:
```
bot_virtualhostname
bot_maxdownloadspeed
bnet_username
bnet_password
bnet_firstchannel
bnet_rootadmins
```
> If you have not already done so, create an account on Eurobattle.net for your bot. If you have any capital letters in your password, make them all lower-case when entering it in the `aura.cfg` file.
> 
> Everything else should be self-explanatory. If it is not, please refer to the comments on the `.cfg` file.
> 
> Save the editor and close it (`CTRL + S`).


10. Navigate to `mapcfgs/`
11. Find the 2 `.cfg` files. They are config files for loading maps.
    > They are not required but recommended to use if you have a player-base using your bot and want them to always play the latest version only.
12. Edit the files respectively; one is for the korean map, the other is for the english map. (TWRPG specific)
> Each time you upload a new version of the map, you need to edit these files to update the version number.
> 
> Then in game whisper the bot the !load command to reload the config file. This will be explained again later in the [Maintenance](#maintenance) section

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
2. In a browser, navigate to `aura-bot files` link found in the [Tools and links](#tools-and-links) section.
3. Scroll down to the `Building` section for `Linux`. Follow the `Steps` by pasting in the code line by line.

### Set-up `crontab`
1. In `PuTTY` type `crontab -e`
2. It will ask you to select an editor. Enter `2`
3. Press the letter `i`. You should see the bottom left change to say `- INSERT -`. This will allow you to start typing.
4. Use the arrow keys to move your cursor down to the very bottom, then to the very right. Now press `Enter` to create a new line.
5. Paste in this line: `*/1 * * * * ~/restart_aura.sh > /dev/null`
6. Press `ESC`. The `- INSERT -` text at the bottom left should now be gone.
7. Type in `:wq` and press `Enter`. This time you have to type it instead of pasting. This will save and close the file.
8. Within the next minute, your hostbot will start
> You can close `PuTTY` and `WinSCP` at this point and log into your Warcraft III (your own account) and test your bot

# Maintenance
Here are some tips to maintaining your hostbot

[List of Bot Commands]()

## Map uploading
1. Open `WinSCP` and navigate to `aura-bot/maps/`
2. From the left hand side of the window, find the map you want to upload and drag it over to the right hand side.
3. Nagivate to `aura-bot/mapcfgs/` and edit the respective config file to update the version number.
4. Log into Warcraft III and reload the map config file by typing: `/w botname !load twre`

## Host-bot restarting
In order to restart the bot, it is recommended to login into Warcraft III and whisper the command: `/w botname !exit`

If your bot happends to be stuck/not responding, you can restart your bot through the server.
1. Open `PuTTY`, type in `fa` - its an alias for finding the aura-bot's process ID.
2. The very first number from the left is the process ID.
3. Type `Kill processID`

Within the next minute, it will start the bot again automatically.
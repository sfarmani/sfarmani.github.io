# Table of Contents
1. [Introduction](#introduction)
2. [Tools and links](#tools-and-links)
3. [Choosing a VPS](#choosing-a-vps)
4. [VPS setup](#vps-setup)
5. [Host-bot Setup](#host-bot-setup)

# Introduction
Setting up a Warcraft III 1.28.5 hostbot can be stressful and if you don't have any coding experience it can dissuade you from trying. My hope is that anyone can make a hostbot with this tutorial.

Unfortunately, a hostbot on a server is not a free service (unless you use AWS Ec2 or Google Compute Engine - I will cover those in the [Choosing a VPS](#choosing-a-vps) section).

If you would like to setup a bot on your local PC, then you can follow [this guide]() instead.

# Tools and links
1. [PuTTY](https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe) - To access your VPS terminal through SSH
2. [PuTTYgen](https://the.earth.li/~sgtatham/putty/latest/w64/puttygen.exe) - To generate a private and public key
3. [WinSCP](https://winscp.net/eng/download.php) - For transfering files easier (as well as editing files easier)
4. [aura-bot files - forked by me](https://github.com/sfarmani/aura-bot)

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

Using Digital Ocean as an example, searching up "Digital Ocean data center locations" will bring you to this [page](https://docs.digitalocean.com/products/platform/availability-matrix/)

One of the reasons Digital Ocean is my recommended is because it has a diverse set of locations.

## OS available
Most VPS would have the Operating System we will use in this tutorial, but its not a bad thing to just make sure.

The OS we will use in this tutorial is Ubuntu 18.04

## Pricing
A Virtual Private Server is a server that has the bare minimum so it shouldn't cost a lot. Digital Ocean's lowest VPS costs only 5 USD per month.

As a recommendation, you shouldn't be paying anything over 10 USD per month. 5 USD is also a good minimum because anything lower could lead to not enough resources for the hostbot to run.

## VPS Specs
A Warcraft III hostbot requires a small amount of resources to run.

1. 1 CPU - more CPUs increase performance
2. At least 2 GB of RAM
3. At least 3 GB of storage
4. 200 mb/s transfer rate or higher (bandwith)

If you want a better performance bot, then you should focus on maximizing #1 and #4 and just get the minimum of #2 and #3. For some VPS, that my cause you to pay extra, or above 10 USD, so choose wisely.

## AWS EC2 and Google Compute Engine
Amazon and Google offer some VPS services as well, some of which provide up to 1 year's worth of free trial.

Although that sounds great, I believe there are some downsides to using them.

### Pro's
\+ Since its a free trial for 1 year, its great practice and doesn't cost anything (as long as you are within their conditions)

\+ Have lots of locations to choose from

### Con's
\- Hard to use interface, not very intuitive.

\- Has extra steps to configuring the hostbot (port forwarding - firewall setup)

\- Has restrictions and conditions in order to get the free trial.

\- For the Google Compute Engine, some [countries are banned](https://support.google.com/cloudidentity/answer/2891389?hl=en#:~:text=However%2C%20Google%20restricts%20access%20to,%2C%20North%20Korea%2C%20and%20Syria.) from using it, so players from those regions can't connect to your bot.

# VPS Setup
Once you've chosen your VPS, then we can begin setting it up. I will use Digital Ocean as examples.

Navigate to your VPS's site (for [Digital Ocean](https://www.digitalocean.com)) and sign up with an account.

It will immediately require you to enter a your Credit Card/PayPal information. It will not charge you immediately, however it will check if you have at least 5 USD available. Its to ensure that you will be able to make payments.

To reiterate, it won't charge you until you make an instance of a server and use it for about a month.

Once you are done setting up a credit card, it will probably as you jump in.

We don't want to do that, so we will skip it by click on the link that says "Explore our control panel".


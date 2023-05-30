class Device
{
    name = "";
    os = "";
    app = "IMSHOP";

    static s_Device = null;

    constructor(name, os)
    {
        this.name = name;
        this.os = os;
    }

    static getDevice()
    {
        if(Device.s_Device !== null)
            return Device.s_Device;

        if(navigator.userAgent.match(/Android/i))
        {
            Device.s_Device = new Device("Android", "Android");
            return Device.s_Device;
        }
        else if(navigator.userAgent.match(/iPhone|iPad|iPod/i))
        {
            Device.s_Device = new Device("iOS", "iOS");
            return Device.s_Device;
        }
        else if(navigator.userAgent.match(/Windows/i))
        {
            Device.s_Device = new Device("Windows", "Windows");
            return Device.s_Device;
        }
        else if(navigator.userAgent.match(/Mac/i))
        {
            Device.s_Device = new Device("Mac", "Mac");
            return Device.s_Device;
        }
        else if(navigator.userAgent.match(/Linux/i))
        {
            Device.s_Device = new Device("Linux", "Linux");
            return Device.s_Device;
        }

        return null;
    }
}

export default Device;
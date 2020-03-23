const Color = artifacts.require("./src/contracts/color.sol");

require('Chai').use(require('chai-as-promised')).should();

contract('color',(accounts)=>{

    describe('deployment',async()=>{
        let contract;

        before(async()=>{
            contract = await Color.deployed();
        })

        it('deploys successfully',()=>{
            const add = contract.address
            assert.notEqual(add,'');
            assert.notEqual(add,0x0);
            assert.notEqual(add,null);
            assert.notEqual(add,undefined);
        })

        it('has a name',async()=>{
            const name = await contract.name()
            assert.equal(name,"color");
        })

        it('has a symbol',async()=>{
            const symbol = await contract.symbol()
            assert.equal(symbol,"COLOR");
        })
        
        // it('has a token ID',async()=>{
        //     const url = await contract.tokenURI(URL)
        //     assert.equal(url,"_color");
        // })
    })

    describe('minting',async()=>{

        before(async()=>{
            contract = await Color.deployed();
        })

        it("creates a new token", async()=>{
            const result = await contract.mint('HBF7779')
            const total = await contract.totalSupply()
            assert.equal(total,1);
            //console.log(result);
            const event = result.logs[0].args;
            assert.equal(event.tokenId.toNumber(),1,'id is correct');
            assert.equal(event.from,'0x0000000000000000000000000000000000000000','from is correct');
            assert.equal(event.to,accounts[0],'to is correct');

            await contract.mint('HBF7779').should.be.rejected;
        })
    })

    describe('indexing',async()=>{

        before(async()=>{
            contract = await Color.deployed();
        })

        it('lists colors',async()=>{
            await contract.mint('HBF7777')
            await contract.mint('FFFFFFF')
            await contract.mint('#000000')
            const totalSupply = await contract.totalSupply();

            let color
            let result = []

            for( var i =1 ;i<=totalSupply;i++){
                color = await contract.colors(i-1);
                result.push(color); 
            }
            let expected = ['HBF7779','HBF7777','FFFFFFF','#000000'];
            assert.equal(result.join(','), expected.join(','));
            // console.log(expected)
            // console.log(result)
        })

    })
})
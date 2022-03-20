export async function saveShippingMethod(parent, args, context, info) {
    
    if(args.name == null ) return { __typename: "InputError", message: `Veuillez donner une désignation`,};
    if(args.code == null ) return { __typename: "InputError", message: `Veuillez donner un code`,};
    if(args.desc == null ) return { __typename: "InputError", message: `Veuillez donner une description`,};

    var query0 = { id: args.id }, query1 = { code: args.iso3 }, query2 = {not: args.id,}

    if(args.id != null){
      let shippingMethod = await context.prisma.shippingMethod.findUnique({ where: query0 })
      if (!shippingMethod) return { __typename: "InputError", message: `Ce mode de livraison n'éxiste pas`,};
      query1.id = query2
    } 

    let row = await context.prisma.shippingMethod.findFirst({ where: query1 })
    if(row) return { __typename: "InputError", message: `Ce code est déjà attribué à un mode de livraison`,};

    const date = new Date()
    const data= {name: args.name, code: args.code, desc: args.desc}

    let shippingMethod = args.id ? 
            await context.prisma.shippingMethod.update({where: {id:args.id}, data: {...data, updatedat: date}}) :
            await context.prisma.shippingMethod.create({data: data})

    return { __typename: "ShippingMethod", ...shippingMethod,};
}

export async function deleteShippingMethod(parent, args, context, info){

  if(args.id == null) return { __typename: "InputError", message: `Veuilez donner un identifiant`,};

  let entity = await context.prisma.shippingMethod.findUnique({ where: { id: args.id } })
  if(!entity) return { __typename: "InputError", message: `Ce mode de livraison n'éxiste pas`,};
    
  const deletedEntity = await context.prisma.shippingMethod.delete({where: {id: args.id,},})
  return { __typename: "ShippingMethod", ...deletedEntity,};
  
}


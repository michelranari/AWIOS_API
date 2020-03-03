//
//  Accueil.swift
//  Motee
//
//  Created by Rayan Bahroun on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct Accueil: View {
    @State var filtred : Bool
    var filter1 = "date"
    var filter2 = "like"
    var body: some View {
        VStack{
            Filtre(filtred: $filtred, filter1: filter1, filter2: filter2)
        }
    }
}
    
    struct Accueil_Previews: PreviewProvider {
        @State static var filtre = false
        static var previews: some View {
            Accueil(filtred: true)
        }
}

import { container } from "tsyringe";

import { OrderContainer } from "@/modules/order";
import { ProductContainer } from "@/modules/product";
import { ProvidersContainer } from "../providers/providers.container";

ProvidersContainer.register(container);

OrderContainer.register(container);
ProductContainer.register(container);
